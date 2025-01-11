import dotenv from 'dotenv';
dotenv.config();

export const config = {
    dbURI: process.env.DB_URI || '',
    port: parseInt(process.env.PORT || '3000', 10),
};
