import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    RelationOptions,
    ManyToOne,
    EntityManager
} from "typeorm";
import {User} from "./user";

const userOpts: RelationOptions = {cascade: ["remove"], nullable: false, onDelete: "CASCADE", createForeignKeyConstraints: true};

@Entity("chat")
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number=0;

    @Column()
    @ManyToOne(() => User, userOpts)
    userId: number=0;

    @Column()
    @ManyToOne(() => User, userOpts)
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
        return res.identifiers[0]["id"] as number;
    } catch(err) {
        console.error(err);
        throw err;
    }
};
