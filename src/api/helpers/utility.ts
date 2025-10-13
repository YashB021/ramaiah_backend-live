
import jwt from "jsonwebtoken";
import { env } from "../../infrastructure/env";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: env.CLOUDINARY_USER_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
})
export default cloudinary;

export const getOffset = (pageNo:number,limit:number): any =>{
    if(pageNo === 0){
        pageNo=1
    }
    let offsetVal: number = (pageNo - 1) * limit;
    return offsetVal;
}

export const generateId=(count:number):any =>{
    var digits = '0123456789';
    let num = '';
    for (let i = 0; i < count; i++) {
        num += digits[Math.floor(Math.random() * 10)];
    }
    return parseInt(num);
}





export const generateAccessToken = (userId: number): string => {
    return jwt.sign({ userId }, env.JWT_SECRET || "", { expiresIn: "7d" });    // 7 days
};


export const generateRefreshToken = (userId: number): string => {
    return jwt.sign({ userId }, env.JWT_SECRET || "", { expiresIn: "180d" });  // 6 month
};


// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter (optional: restrict types)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowed = ["image/jpeg", "image/png", "video/mp4", "application/pdf","image/svg+xml"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

export const uploadMedia = multer({ storage, fileFilter });