"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FaunaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaunaModule = void 0;
const common_1 = require("@nestjs/common");
const fauna_service_1 = require("./fauna.service");
let FaunaModule = FaunaModule_1 = class FaunaModule {
    static forRoot(config) {
        const options = {
            provide: 'FAUNADB',
            useValue: config,
        };
        return {
            global: config.isGlobal || false,
            module: FaunaModule_1,
            providers: [options],
            exports: [fauna_service_1.FaunaService],
        };
    }
};
exports.FaunaModule = FaunaModule;
exports.FaunaModule = FaunaModule = FaunaModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [fauna_service_1.FaunaService],
        exports: [],
    })
], FaunaModule);
//# sourceMappingURL=fauna.module.js.map