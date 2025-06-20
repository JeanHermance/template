import  express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from "./config/database";
import userRoutes from './routes/userRoutes'
import enfantRoutes from './routes/enfantRoute';
import elementRoutes from './routes/elementRoute';
import devinetteRoutes from './routes/devinateRouter';
import maquetteRoutes from './routes/maquetteRouter';
import { createServer } from "http";
import { Server } from "socket.io"
import path from "path";
import session from "express-session";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

const httpServer = createServer(app);
const io = new Server(httpServer , {
    cors: {
        origin: '*',
    }
})


app.set("io",io);
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}))

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log(error);
    })

app.use("/api", userRoutes);    
app.use("/api", enfantRoutes);
app.use("/api", elementRoutes);
app.use("/api", devinetteRoutes);
app.use("/api", maquetteRoutes)




app.listen(process.env.PORT , () => {
    console.log('Server is running on port:',process.env.PORT);
})
export default app;