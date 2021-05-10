import pgPromise, { IDatabase } from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import bluebird from "bluebird";
import dotenv from 'dotenv';
import {UnknownError} from "../../types/error";

export class PostgreSQLConnection {
    private static readonly _instance = new PostgreSQLConnection();
    public static instance() {
        return PostgreSQLConnection._instance;
    }
    private readonly db: IDatabase<pg.IClient>|undefined = undefined;
    private constructor() {
        dotenv.config( { debug: true } );
        const DB_URL = process.env.DB_URL || "";
        try {
            const pgp = pgPromise({promiseLib: bluebird});
            console.log(`connecting to ${DB_URL}`)
            this.db = pgp(DB_URL);
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    public static async executeInTransaction<TRes>(query: string, args: any[], outfield?: string) {
        const inst = PostgreSQLConnection.instance();
        try {
            return await inst.executeInTransaction<TRes>(query, args, outfield);
        } catch(err) {
            throw err;
        }
    }

    public static async execute<TRes>(query: string, args: any[], outfield?: string) {
        const inst = PostgreSQLConnection.instance();
        try {
            return await inst.execute<TRes>(query, args, outfield);
        } catch(err) {
            throw err;
        }
    }

    public async executeInTransaction<TRes>(query: string, args: any[], outfield?: string) {
        console.log("executeInTransaction")
        if(!this.db) {
            console.error("db is blank")
            throw UnknownError();
        }
        console.log(`${query} `, args)
        let res;
        try {
            const resArr = await this.db.tx( (t) => {
                const q1 = t.one(query, args);
                console.log('executing batch')
                const r = t.batch([q1]);
                console.log('executed batch')
                return r;
            });
            console.log('executed tx', resArr)
            res = resArr?.[0]?.res;
        } catch(err) {
            console.error(err);
            throw UnknownError();
        }
        console.log("res=", res)
        const errors = res?.errors;
        if(errors) {
            throw errors;
        }
        if(outfield) {
            const out = res[outfield] as TRes;
            console.log(`${outfield} = ${out}`);
            return out;
        } else {
            console.log('outfield is blank - returning res ', res)
        }
        return res;
    }

    public async execute<TRes>(query: string, args: any[], outfield?: string) {
        if(!this.db) {
            console.error("db is blank")
            throw UnknownError();
        }
        console.log(`${query} `, args)
        let res;
        try {
            console.log('executing db.one')
            const r = await this.db.one(query, args);
            res = r?.res;
            console.log('executed db.one', r)
        } catch(err) {
            console.error(err);
            throw UnknownError();
        }
        console.log("execute res=", res)
        const errors = res?.errors;
        if(errors) {
            throw errors;
        }
        if(outfield) {
            const out = res[outfield] as TRes;
            console.log(`${outfield} = ${out}`);
            return out;
        } else {
            console.log('outfield is blank - returning res ', res)
        }
        return res;
    }
}