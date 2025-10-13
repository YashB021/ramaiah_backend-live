import { AppDataSource } from "../../config/db";
import { User, UserRole } from "../entities/users.entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../../infrastructure/env";
export const registerUser = async (
    reqBody:any,
    callback:(error:any, result:any) => void
)=>{
    try {
        const { username, email, password, firstName, lastName } = reqBody;

        // Check if user already exists
        const userRepo = AppDataSource.getRepository(User);
        const existingUser = await userRepo.findOne({ where: [{ email }, { username }] });

        if (existingUser) {
            return callback( "Username or Email already exists",null)
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const newUser = userRepo.create({
            username,
            email,
            passwordHash,
            firstName,
            lastName,
        });

        await userRepo.save(newUser);

    return callback(null,{
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
    })
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}

export const loginApi = async (
    email: string,
    password: string,
    callback:(error:any, result:any) => void
)=>{
    try {
       
       
        // Validate input
        if (!email || !password) {
            return callback("Email and password are required",null);
        }

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            return callback("Invalid email or password" ,null);
        }

        // Check role
        if (user.role !== UserRole.SUPER_ADMIN) {
            return callback("Access denied: Not a super admin" ,null);
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return callback( "Invalid email or password"  ,null);
        }

        // Create JWT
        const token = jwt.sign(
        { id: user.id, role: user.role, user_type: "admin"},
        String(env.JWT_SECRET) || "",
        { expiresIn: "1d" }
        );


        return callback(null,{
            token,
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            return callback(error.message,null)
        }
    }
}