import {Connection, createConnection} from "typeorm";

export class DB {
    private static _conn: Connection;

    public static async getConnection() {
        if(!DB._conn) {
            try {
                DB._conn = await createConnection();
            } catch(err) {
                console.error(err);
                throw(err);
            }
        }
        return DB._conn;
    }
}
