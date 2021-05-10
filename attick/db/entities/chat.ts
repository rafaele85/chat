import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    RelationOptions,
    ManyToOne,
    EntityManager, JoinColumn
} from "typeorm";
import {User} from "./user";

const userOpts: RelationOptions = {cascade: ["remove"], nullable: false, onDelete: "CASCADE", createForeignKeyConstraints: true};

@Entity("chat")
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number=0;

    @ManyToOne(() => User, userOpts)
    @JoinColumn({name: "userId"})
    userId: number=0;

    @ManyToOne(() => User, userOpts)
    @JoinColumn({name: "friendId"})
    friendId: number=0;

}

export const getChatIdByUserIdAndFriendId = async (entityManager: EntityManager, userId: number, friendId: number) => {
    try {
        const res = await entityManager.createQueryBuilder()
            .select("id")
            .from<number>(Chat, "c")
            .where("c.userId = :userId", {userId})
            .andWhere("c.friendId = :friendId", {friendId})
            .getRawOne();
        return res?.id;
    } catch(err) {
        console.error(err);
        throw err;
    }
};


export const createChat = async (entityManager: EntityManager, userId: number, friendId: number) => {
    try {
        const c = new Chat();
        c.userId=userId;
        c.friendId = friendId;
        const res = await entityManager.insert<Chat>(Chat, c);
        const id = res?.identifiers?.[0]?.["id"] as number;
        console.log('createChat id=', id, "res=", res)
        return id;
    } catch(err) {
        console.error(err);
        throw err;
    }
};

export const chatListForUserId = async (entityManager: EntityManager, userId: number) => {
    try {
        const res = await entityManager.createQueryBuilder()
            .select("fu.username")
            .from<Chat>(Chat, "c")
            .where("c.userId = :userId", {userId})
            .orWhere("c.friendId = :userId", {userId})
            .getMany();
        return res;
    } catch(err) {
        console.error(err);
        throw err;
    }
};
