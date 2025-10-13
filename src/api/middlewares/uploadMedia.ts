
import multer from "multer";


const storage = multer.memoryStorage(); // Stores file in memory as Buffer.
const upload = multer({storage});

export {upload}
