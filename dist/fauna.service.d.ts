import { Logger } from '@nestjs/common';
import { Client } from 'faunadb';
export declare class FaunaService extends Logger {
    private readonly client;
    constructor(options: {
        secret: string;
        domain?: string;
        db_name: string;
        port?: number;
    });
    getClient(): Client;
    createCollection(name: string): Promise<object>;
    createIndex(name: string, collection: string, fields: string[]): Promise<object>;
    createDocument(collection: string, data: Record<string, unknown>): Promise<void>;
    getDocuments(collection: string): Promise<object>;
    getDocument(collection: string, ref: string): Promise<object>;
}
//# sourceMappingURL=fauna.service.d.ts.map