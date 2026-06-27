import express from "express";
import { authenticate } from "./middleware/auth.middleware.js";

const app = express();
const port = 3000;

app.get("/health", (_req, res) => {
  res.json({ message: "API works fine" });
});

app.get("/search",authenticate,(_req,res)=>{
    res.json({result:[]})
})


app.get("/history",authenticate,(_req,res)=>{
    res.json({result:[]})
})

app.delete("/history/:id",authenticate,(_req,res)=>{
    res.json({result:[]})

})


app.get("/bookmark",authenticate,(_req,res)=>{
    res.json({result:[]})
})

app.post("/bookmark",authenticate,(_req,res)=>{
    res.json({result:[]})
})

app.delete("/bookmark/:id",authenticate,(_req,res)=>{
    res.json({result:[]})
})


app.post("/signup",(_req,res)=>{
    res.json({result:[]})
})

app.post("/login",(_req,res)=>{
    res.json({result:[]})
})

app.get("/user",authenticate,(_req,res)=>{
    res.json({result:[]})

})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});