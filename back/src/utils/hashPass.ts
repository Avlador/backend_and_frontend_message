import bcrypt from "bcrypt";

export async function hashedPass(pass: string): Promise<string> {
    return await bcrypt.hash(pass, 10);
}