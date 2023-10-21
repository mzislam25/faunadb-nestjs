# 📂 faundb-nestjs
Reusable NestJs package for Fauna dB connection.

## Install

```bash
npm install --save faundb-nestjs
# or
yarn add faundb-nestjs
```

# Usage

### Sample implementation 

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaunaModule } from 'faunadb-nestjs';

@Module({
  imports: [
    FaunaModule.forRoot({
      secret: 'xxxxxxxxxxxxxxxxxx',
      db_name: 'xxxxxxxx',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
```ts
import { Injectable } from '@nestjs/common';
import { FaunaService } from 'faunadb-nestjs';

@Injectable()
export class AppService {
  constructor(private faunaService: FaunaService) {}
  async getCustomers(): Promise<any> {
    const customers = await this.faunaService.getDocuments('Customer');
    return customers;
  }
}
```
```ts
import { Injectable } from '@nestjs/common';
import { FaunaService, Client, query as q } from 'faunadb-nestjs';

@Injectable()
export class AppService {
  private client: Client;
  constructor(private faunaService: FaunaService) {
    this.client = this.faunaService.getClient();
  }
  async getCustomers(): Promise<any> {
    const customers = await this.client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Customer'))),
        q.Lambda('x', q.Get(q.Var('x'))),
      ),
    );
    return customers;
  }
}
```

## Author

[Zahir](https://krittimmanush.com/)


## License

MIT