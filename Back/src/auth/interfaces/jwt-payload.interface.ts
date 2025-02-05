import { Role } from "src/user/entities/role.entity";

export interface JwtPayload {
    username: string;
    sub: number;
    role: Role;
  }