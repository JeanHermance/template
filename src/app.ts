import  express  from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "./config/database";
import userRoutes from './routes/userRoutes'

dotenv.config();

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log(error);
    })

app.use("/api", userRoutes);

app.listen(process.env.PORT , () => {
    console.log('Server is running on port:',process.env.PORT);
})
export default app;