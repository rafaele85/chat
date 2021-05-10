import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import {APIController} from "./api";
import {AuthController} from "./auth";
import {ChatController} from "./chat";

const initializeControllers = () => {
   AuthController.initialize();
   ChatController.initialize();
}

const startApp = () => {
   try {
      dotenv.config( { debug: true } );
      let PORT: number = 0;
      if (process.env.PORT) {
         PORT = Number.parseInt(process.env.PORT || "", 10);
      }
      const HOST = process.env.HOST || "";

      const app = express();
      app.set("port", PORT);

      app.use(morgan("dev"));
      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({extended: true}));

      const httpServer = http.createServer(app);

      initializeControllers();
      //SocketIOServer.instance().initialize(httpServer);

      app.use("/api", APIController.getRouter());

      console.log(`HOST=${HOST} PORT=${PORT}`)

      httpServer.listen(PORT, HOST, () => {
         console.log(`listening ${HOST}:${PORT}`);
      });

   } catch(err) {
      console.error(err)
   }

}


startApp();

