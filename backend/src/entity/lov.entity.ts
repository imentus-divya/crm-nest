import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Lov_type } from "./lov_type.entity";
@Entity('lov')
export class Lov {
    // define columns   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    // @ManyToOne(() => Lov_type, type_id => type_id.id,@JoinColumn({ name: 'type_id' });
    // type: Lov_type; 

    @ManyToOne(() => Lov_type, lovType => lovType.id)
    @JoinColumn({ name: 'type_id' }) // Specify the name of the foreign key column here
    type: Lov_type;




}