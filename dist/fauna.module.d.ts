import { DynamicModule } from '@nestjs/common';
export declare class FaunaModule {
    static forRoot(config: {
        isGlobal?: boolean;
        secret: string;
        domain?: string;
        db_name: string;
        port?: number;
    }): DynamicModule;
}
//# sourceMappingURL=fauna.module.d.ts.map