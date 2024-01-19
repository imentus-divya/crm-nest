import { Entity,Column, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { User } from "./user.entity";
@Entity('groups')
export class Groups{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    // bidirectional relation to user table
    @OneToMany(() => Groups, (group_id) => group_id.user_id, { eager: false })
    group_id: Groups[];

    @OneToMany(() => User, (user_id) => user_id.group_id, { eager: false })
    user_id: Groups[];
}