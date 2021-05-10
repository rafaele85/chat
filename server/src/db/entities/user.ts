import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, EntityManager} from "typeorm";

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number=0;

    @Column({unique: true})
    username: string="";

    @Column()
    hashpassword: string="";

    @Column()
    photourl: string="";

}

export const getUserIdByUsernameAndHashpassword = async (entityManager: EntityManager, username: string, hashPassword: string) => {
    try {
        const res = await entityManager.createQueryBuilder()
            .select("id")
            .from<number>(User, "u")
            .where("u.username = :username", {username})
            .andWhere("u.hashpassword = :hashPassword", {hashPassword})
            .getRawOne();
        const id = res?.id;
        console.log("getUserIdByUsernameAndHashpassword id = ", id)
        return id;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

export const getUserIdByUsername = async (entityManager: EntityManager, username: string) => {
    try {
        const res = await entityManager.createQueryBuilder()
            .select("id")
            .from<number>(User, "u")
            .where("u.username = :username", {username})
            .getRawOne();
        const id = res?.id;
        return id;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

export const createUser = async (entityManager: EntityManager, username: string, hashPassword: string) => {
    try {
        const user = new User();
        user.hashpassword=hashPassword;
        user.username = username;
        const res = await entityManager.insert<User>(User, user);
        return res.identifiers[0]["id"] as number;
    } catch(err) {
        console.error(err);
        throw err;
    }
};
