import {Entity, BaseEntity, Column, PrimaryColumn, OneToOne, JoinColumn, RelationOptions, EntityManager} from "typeorm";
import {ISession} from "../../../../types/session";
import {User} from "./user";
import {uuid} from "../../../../services/uuid";

const relOpts: RelationOptions = {cascade: ["remove"], nullable: false, onDelete: "CASCADE", primary: true, createForeignKeyConstraints: true};

@Entity()
export class Session extends BaseEntity {

    @PrimaryColumn()
    @OneToOne(() => User, relOpts)
    @JoinColumn({name: "id"})
    id: number=0;

    @Column({unique: true, nullable: false})
    session: ISession="";
}



export const deleteSessionById = async (entityManager: EntityManager, id: number) => {
    try {
        await entityManager.delete<Session>(Session,{id} );
    } catch(err) {
        console.error(err);
        throw err;
    }
};

export const deleteSessionBySession = async (entityManager: EntityManager, session: ISession) => {
    try {
        await entityManager.delete<Session>(Session,{session} );
    } catch(err) {
        console.error(err);
        throw err;
    }
};

export const createSession = async (entityManager: EntityManager, id: number) => {
    try {
        const session = new Session();
        session.id = id;
        session.session = uuid();
        await entityManager.insert<Session>(Session, session);
        return session;
    } catch(err) {
        console.error(err);
        throw err;
    }
};


export const getSessionIdBySession = async (entityManager: EntityManager, session: ISession) => {
    try {
        const res = await entityManager.createQueryBuilder()
                .select("id")
                .from<number>(Session, "s")
                .where("s.session = :session", {session})
                .getRawOne();
        const id = res.id;
        return id;
    } catch(err) {
        console.error(err);
        throw err;
    }
};