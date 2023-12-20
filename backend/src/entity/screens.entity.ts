import { Entity,Column, PrimaryGeneratedColumn ,OneToMany} from "typeorm";
import { Screen_url } from "./screen_url.entity";
import { Role_Screen } from "./role_screen.entity";

@Entity('screens')
export class Screens {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
    
    // to connect screen_url table
    @OneToMany(() => Screen_url, screenUrl => screenUrl.id)
    screenUrls: Screen_url[];

     // to connect role_screen table
    @OneToMany(() => Role_Screen, Role_Screen => Role_Screen.id)
    Role_screen: Screen_url[];

    // many-to-one relationship where many users can be associated with one role. 
    // It specifies that the User entity will have a property called role, which is linked to the Roles entity. 
    // The role property represents the role that a user belongs to.

}