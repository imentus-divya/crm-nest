import { Entity,Column, PrimaryGeneratedColumn ,OneToMany} from "typeorm";
import { User } from "./user.entity";
import { Role_Screen } from "./role_screen.entity";

@Entity('roles')
export class Roles
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ nullable: false })
    name:string

    @Column({ default: () => 'NOW()' })
    created_date: Date;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => User, user => user) // One role can be associated with many users
    users: User[];

    // mapping with role_screen table
    @OneToMany(() => Role_Screen, role_sc => role_sc.id) // One role can be associated with many users
    role_sc: Role_Screen['id'];

}