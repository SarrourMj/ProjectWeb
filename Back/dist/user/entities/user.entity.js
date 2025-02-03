"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const course_entity_1 = require("./../../course/entities/course.entity");
const role_entity_1 = require("./role.entity");
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, role => role.users),
    tslib_1.__metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "score", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => course_entity_1.Course, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "courses", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("simple-array", { default: "", nullable: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "badges", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)('user')
], User);
//# sourceMappingURL=user.entity.js.map