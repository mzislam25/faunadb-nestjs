import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Client, query as q } from 'faunadb';

@Injectable()
export class FaunaService extends Logger {
  private readonly client: Client;

  constructor(
    @Inject('FAUNADB')
    options: {
      secret: string;
      domain?: string;
      db_name: string;
      port?: number;
    },
  ) {
    super();
    if (!(options && options.secret)) {
      return;
    }
    this.client = new Client({
      secret: options.secret,
      domain: options.domain ? options.domain : 'db.fauna.com',
      port: options.port ? options.port : 443,
      scheme: 'https',
    });
    this.client
      .query(q.Paginate(q.Collections()))
      .then(() => {
        console.log(`Connected to ${options.db_name} successfully`);
      })
      .catch((err) => {
        console.error(err, 'DB Connection Error');
      });
  }

  getClient() {
    return this.client;
  }

  async createCollection(name: string) {
    try {
      return await this.client.query(q.CreateCollection(name));
    } catch (error) {
      console.error(error);
    }
  }

  async createIndex(name: string, collection: string, fields: string[]) {
    try {
      return await this.client.query(
        q.CreateIndex({
          name: name,
          source: q.Collection(collection),
          terms: fields.map((elem) => {
            return { field: ['data', elem] };
          }),
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async createDocument(collection: string, data: Record<string, unknown>) {
    try {
      await this.client.query(
        q.Let(
          {
            col: q.If(
              q.Exists(q.Collection(collection)),
              q.Collection(collection),
              q.CreateCollection({ name: collection }),
            ),
            data: { data: data },
          },
          q.Create(q.Var('col'), q.Var('data')),
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getDocuments(collection: string) {
    try {
      return await this.client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection(collection))),
          q.Lambda('x', q.Get(q.Var('x'))),
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getDocument(collection: string, ref: string) {
    try {
      return await this.client.query(
        q.Get(q.Ref(q.Collection(collection), ref)),
      );
    } catch (error) {
      console.error(error);
    }
  }
}
