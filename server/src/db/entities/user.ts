import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

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