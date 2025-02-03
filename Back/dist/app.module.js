"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const course_module_1 = require("./course/course.module");
const chapter_module_1 = require("./chapter/chapter.module");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const role_entity_1 = require("./user/entities/role.entity");
const course_entity_1 = require("./course/entities/course.entity");
const chapter_entity_1 = require("./chapter/entities/chapter.entity");
const category_entity_1 = require("./category/entities/category.entity");
const category_module_1 = require("./category/category.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST'),
                    port: configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USERNAME'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    entities: [user_entity_1.User, course_entity_1.Course, chapter_entity_1.Chapter, category_entity_1.Category, role_entity_1.Role],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            course_module_1.CourseModule,
            chapter_module_1.ChapterModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map