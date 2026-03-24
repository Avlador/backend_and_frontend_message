import express, { Request, Response } from "express";
import { hashedPass } from "../utils/hashPass";
import {prisma} from "../db";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

interface LoginBodi{
  email: string;
  password: string;
}
const router = express.Router();

router.post("/login", async function (params) {});
router.post("/logout", async function (params) {});

router.post(
  "/register",
  async function (req: Request<{}, {}, RegisterBody>, res: Response) {
    try {
      const { username, email, password } = req.body;
      if (!email || !password || !username)
        throw new Error("Email or password error1");
      if (email) {
      } // есть ли такой пользователь в бд
      const hashPass = await hashedPass(password);
      console.log(username, email, password);
      
      // -------------------------------------------------
      const newUser = await prisma.user.create({
        data: { username, email, password: hashPass },
      });
      // --------------------------------------------------
      // const newUser = await pool.query(
      //   "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      //   [username, email, hashedPass],
      // );
      return res.status(201).json({ text: newUser });
    } catch (e : any) {
      console.log(e);
// Check if it's a Prisma Unique Constraint error
      if (e.code === 'P2002') {
        return res.status(400).json({ error: "Username or Email already taken" });
      }
      console.log(e.code);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);
router.post("/registerr", async (req, res) => {
  try {
    console.log("Checking DB connection...");
    await prisma.$queryRaw`SELECT 1`; // Простейший запрос
    res.send("DB is alive");
  } catch (e: any) {
    console.log("DIAGNOSTIC ERROR:", e.code, e.message);
    res.status(500).send(e.message);
  }
});
export default router;



