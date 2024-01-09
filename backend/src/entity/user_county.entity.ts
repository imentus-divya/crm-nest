import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn ,OneToMany} from "typeorm";
import { User } from "./user.entity";
import { Lov } from "./lov.entity";
@Entity('user_county')
export class User_County{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>User,user_id=>user_id.id)
    @JoinColumn({name:"user_id"})
    user_id:number

    @ManyToOne(()=>Lov,lov_id=>lov_id.id)
    @JoinColumn({name:"county"})
    county_id:number

}