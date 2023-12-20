import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('lov_type')
export class Lov_type{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
}