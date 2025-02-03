"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AdminService = class AdminService {
    create(_createAdminDto) {
        return 'This action adds a new admin';
    }
    findAll() {
        return `This action returns all admin`;
    }
    findOne(id) {
        return `This action returns a #${id} admin`;
    }
    update(id, _updateAdminDto) {
        return `This action updates a #${id} admin`;
    }
    remove(id) {
        return `This action removes a #${id} admin`;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=admin.service.js.map