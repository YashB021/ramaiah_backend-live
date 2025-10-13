import { env } from '../../env'
import express from 'express'
import bodyParser from 'body-parser'
import { createRouter } from './v1/routes'
import { logger, loggerFile } from '../../../api/lib/logger'
import { createServer as createHttpServer } from 'http' // Import HTTP module
import { cronjob } from '../../../api/cron/jobs'
import path from 'path'
import "../../../api/config/db"
import cors from "cors";

export const createServer = (): void => {
    const app = express();
    const port = env.APPPORT;
    const host = env.HOST;


    app.use(cors());
    /* To handle invalid JSON data request */
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    // app.use("/uploads",express.static(path.join(__dirname,"../uploads")));
    app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));
    
    /** CORS headers */

    // @ts-ignore
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", 'true');
        res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
        res.header("Access-Control-Allow-Headers", "x-requested-with");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });

    /** Create HTTP server */
    const server = createHttpServer(app);

    app.get("/",(req,res) => {
        res.send(`<h1 style="color: green;">Server Running</h1>`)
    })

    app.get("/delete-account-flow",(req, res) => {
        res.sendFile(path.resolve(process.cwd(),"src/api/privacyPolicy/deleteaccount.html"))
    })

    /** API Routes */
    app.use("/api", createRouter());

    cronjob()
    
    /** Listen on Port */
    server.listen(port, () => {
        console.log("Running node version: ", process.version);
        logger.info(`Server running on http://${host}:${port}`);
    });
};
