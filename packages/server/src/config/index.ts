import dotenv from 'dotenv';

dotenv.config();
export default {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    database: process.env.DATABASE_URI,
    salt: process.env.SALT_ROUND,
};
