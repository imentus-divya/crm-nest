import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('groups')
export class Groups{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
}