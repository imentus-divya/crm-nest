import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./roles.entity";
import { Screens } from "./screens.entity";
@Entity('role_screen')
export class Role_Screen
{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Roles,role_sc=>role_sc.id)
    @JoinColumn({name:'role_id'})
    role_id:Roles['id']

    @ManyToOne(()=>Screens,screens_sc=>screens_sc.id)
    @JoinColumn({name:'screen_id'})
    screen_id:Roles['id']

}
