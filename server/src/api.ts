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

    public static async handleRequest(key: string, handler: IRequestHandler, req: Request, res: Response, _next: NextFunction) {
        console.log(`key=${key} handleRequest body=`, req.body)
        const p = handler(req.body||{});
        console.log(`APIController ${key} promise=`,p)
        try {
            const resp = await p;
            console.log(`APIController ${key} response=`,resp)
            res.json(resp);
        } catch(err) {
            console.error(`Error ${key} handleRequest error `, err);
            res.status(400).json(err);
        }
    }


    public static getRouter() {
        const router = express.Router();

        this.postHandlers.forEach((handler: IRequestHandler, key: IApiResources) => {
            router.post(key, async (req: Request, res: Response, next: NextFunction) => {
                await this.handleRequest(key, handler, req, res, next);
            });
        });

        this.getHandlers.forEach((handler: IRequestHandler, key: IApiResources) => {
            router.get(key, async (req: Request, res: Response, next: NextFunction) => {
                await this.handleRequest(key, handler, req, res, next);
            });
        });

        return router;
    }
}

