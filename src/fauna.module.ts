import { DynamicModule, Module } from '@nestjs/common';
import { FaunaService } from './fauna.service';

@Module({
  controllers: [],
  providers: [FaunaService],
  exports: [],
})
export class FaunaModule {
  static forRoot(config: {
    isGlobal?: boolean;
    secret: string;
    domain?: string;
    db_name: string;
    port?: number;
  }): DynamicModule {
    const options = {
      provide: 'FAUNADB',
      useValue: config,
    };

    return {
      global: config.isGlobal || false,
      module: FaunaModule,
      providers: [options],
      exports: [FaunaService],
    };
  }
}
