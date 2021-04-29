import { createPool, Pool } from 'mysql2/promise'

export abstract class DatabaseConnection {

    private readonly connection = async () : Promise<Pool> => {
        const connect = await createPool({
            host: 'localhost',
            user: 'root',
            password: 'admin123',
            database: 'wecry_db',
            connectionLimit: 10
        });

        return connect;
    }

    public get Connection() : Promise<Pool> {
        return this.connection();
    } 

}