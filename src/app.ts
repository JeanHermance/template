import  express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from "./config/database";
import userRoutes from './routes/userRoutes'
import enfantRoutes from './routes/enfantRoute';
import { createServer } from "http";
import { Server } from "socket.io"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer , {
    cors: {
        origin: '*',
    }
})


app.set("io",io);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log(error);
    })

app.use("/api", userRoutes);    
app.use("/api", enfantRoutes);



app.listen(process.env.PORT , () => {
    console.log('Server is running on port:',process.env.PORT);
})
export default app;