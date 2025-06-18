import  express  from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "./config/database";
dotenv.config();

const app = express();

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log(error);
    })



app.listen(process.env.PORT , () => {
    console.log('Server is running on port:',process.env.PORT);
})
export default app;