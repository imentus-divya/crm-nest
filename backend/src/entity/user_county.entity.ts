import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn ,OneToMany} from "typeorm";
import { User } from "./user.entity";
import { Lov } from "./lov.entity";
@Entity('user_county')
export class User_County{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>User,(user_id)=>user_id.county_id)
    @JoinColumn({name:"user_id"})
    user_id:any;
    // @ManyToOne((type) => User, (user) => user.counties, { eager: true })
    // @JoinColumn({name:"user_id"}) // <-- Add this
    // user: User;

    @ManyToOne(()=>Lov,lov_id=>lov_id.id)
    @JoinColumn({name:"county"})
    county_id:number

}