import { Entity,Column, PrimaryGeneratedColumn ,OneToMany} from "typeorm";

@Entity('module_screen')
export class Module_Screen
{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ nullable: false })
    name:string

}