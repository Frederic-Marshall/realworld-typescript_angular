import { userEntity } from "../user.entity";

export type UserType = Omit<userEntity, 'hashPassword'>;