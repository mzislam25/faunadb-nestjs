"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaunaService = void 0;
const common_1 = require("@nestjs/common");
const faunadb_1 = require("faunadb");
let FaunaService = class FaunaService extends common_1.Logger {
    constructor(options) {
        super();
        if (!(options && options.secret)) {
            return;
        }
        this.client = new faunadb_1.Client({
            secret: options.secret,
            domain: options.domain ? options.domain : 'db.fauna.com',
            port: options.port ? options.port : 443,
            scheme: 'https',
        });
        this.client
            .query(faunadb_1.query.Paginate(faunadb_1.query.Collections()))
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
    async createCollection(name) {
        try {
            return await this.client.query(faunadb_1.query.CreateCollection(name));
        }
        catch (error) {
            console.error(error);
        }
    }
    async createIndex(name, collection, fields) {
        try {
            return await this.client.query(faunadb_1.query.CreateIndex({
                name: name,
                source: faunadb_1.query.Collection(collection),
                terms: fields.map((elem) => {
                    return { field: ['data', elem] };
                }),
            }));
        }
        catch (error) {
            console.error(error);
        }
    }
    async createDocument(collection, data) {
        try {
            await this.client.query(faunadb_1.query.Let({
                col: faunadb_1.query.If(faunadb_1.query.Exists(faunadb_1.query.Collection(collection)), faunadb_1.query.Collection(collection), faunadb_1.query.CreateCollection({ name: collection })),
                data: { data: data },
            }, faunadb_1.query.Create(faunadb_1.query.Var('col'), faunadb_1.query.Var('data'))));
        }
        catch (error) {
            console.error(error);
        }
    }
    async getDocuments(collection) {
        try {
            return await this.client.query(faunadb_1.query.Map(faunadb_1.query.Paginate(faunadb_1.query.Documents(faunadb_1.query.Collection(collection))), faunadb_1.query.Lambda('x', faunadb_1.query.Get(faunadb_1.query.Var('x')))));
        }
        catch (error) {
            console.error(error);
        }
    }
    async getDocument(collection, ref) {
        try {
            return await this.client.query(faunadb_1.query.Get(faunadb_1.query.Ref(faunadb_1.query.Collection(collection), ref)));
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.FaunaService = FaunaService;
exports.FaunaService = FaunaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FAUNADB')),
    __metadata("design:paramtypes", [Object])
], FaunaService);
//# sourceMappingURL=fauna.service.js.map