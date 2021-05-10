import {Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, Column} from "typeorm";
import {ISession} from "../../../../types/session";
import {User} from "./user";

@Entity()
export class Session extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id: number=0;

    @OneToOne(() => User)
    @JoinColumn()
    //@Column({unique: true, nullable: false})
    user: User | undefined;

    @Column({unique: true, nullable: false})
    session: ISession="";

}