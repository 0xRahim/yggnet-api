import db from "../../config/database.js";
import { User, CreateUserDTO } from "./auth.types.js";

export class AuthRepository {
  findByEmail(email: string): User | undefined {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email) as User | undefined;
  }

  findById(id: number): User | undefined {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id) as User | undefined;
  }

  create(user: CreateUserDTO): number {
    const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    const info = stmt.run(user.email, user.password);
    return info.lastInsertRowid as number;
  }
}
