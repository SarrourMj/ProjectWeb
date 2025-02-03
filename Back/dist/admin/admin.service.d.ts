import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    create(_createAdminDto: CreateAdminDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, _updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
}
