import { Entity,Column, PrimaryGeneratedColumn ,ManyToOne,JoinColumn} from "typeorm";
import { Lov } from "./lov.entity";

@Entity('upload_meta_data')
export class Upload_meta_data{
    @PrimaryGeneratedColumn()
    id:Number

    @Column({ default: () => 'NOW()' })
    date: Date;

    @ManyToOne(()=>Lov,lov=>lov.name)
    @JoinColumn({ name: 'upload_type',referencedColumnName:'name' }) 
    upload_type:string

    @ManyToOne(()=>Lov,lov=>lov.name)
    @JoinColumn({ name: 'county' ,referencedColumnName:'name'}) 
    county:string;

    @Column()
    filename:string;

    @Column()
    record_count:Number

    @Column()
    view_data:string


  

}