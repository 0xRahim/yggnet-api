import { AuthRepository } from "./auth.repository.js";
import { CreateUserDTO } from "./auth.types.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signup(data: CreateUserDTO) {
    const existingUser = this.authRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);
    const userId = this.authRepository.create({
      email: data.email,
      password: hashedPassword,
    });

    const token = generateToken(userId.toString());
    return { token };
  }

  async login(data: CreateUserDTO) {
    const user = this.authRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id.toString());
    return { token };
  }

  async getUser(id: number) {
      const user = this.authRepository.findById(id);
      if(!user) throw new Error("User not found");
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
  }
}
