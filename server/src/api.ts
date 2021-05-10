import express, {Request, Response, NextFunction} from "express";
import {IApiResources} from "../../types/api";

export type IRequestHandler = (payload: any) => Promise<any>;

export class APIController {
    private static postHandlers = new Map<IApiResources, IRequestHandler>();
    private static getHandlers = new Map<IApiResources, IRequestHandler>();

    public static registerPostHandler(resource: IApiResources, handler: IRequestHandler) {
        this.postHandlers.set(resource, handler);
    }
    public static registerGetHandler(resource: IApiResources, handler: IRequestHandler) {
        this.getHandlers.set(resource, handler);
    }

    public static async handleRequest(handler: IRequestHandler, req: Request, res: Response, _next: NextFunction) {
        console.log(`handleRequest body=`, req.body)
        try {
            const response = await handler(req.body||{});
            res.json(response);
        } catch(err) {
            console.error(`handleRequest error `, err);
            res.status(400).json(err);
        }
    }


    public static getRouter() {
        const router = express.Router();

        this.postHandlers.forEach((handler: IRequestHandler, key: IApiResources) => {
            router.post(key, async (req: Request, res: Response, next: NextFunction) => {
                await this.handleRequest(handler, req, res, next);
            });
        });

        this.getHandlers.forEach((handler: IRequestHandler, key: IApiResources) => {
            router.get(key, async (req: Request, res: Response, next: NextFunction) => {
                await this.handleRequest(handler, req, res, next);
            });
        });

        return router;
    }
}

