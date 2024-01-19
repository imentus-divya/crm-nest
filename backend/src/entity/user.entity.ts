import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,OneToMany
} from 'typeorm';
import { Roles } from './roles.entity';
import { Lov } from './lov.entity';
import { Groups } from './groups.entity';
import { User_County } from './user_county.entity';
import { User_fileType } from './user_filetype.entity';


@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:50})
  first_name: string;

  @Column({length:50})
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({length:50 , unique:true})
  username: string;

  @Column({ nullable: true })
  refresh_token: string | null;

  @Column({ nullable: true })
  expiry_token: Date | null;

  @ManyToOne(() => Roles, (roles) => roles.id)
  @JoinColumn({ name: 'role_id' })
  role_id: any


  @Column() 
  // static now will be retrieved from catalog DB company table
  tenant_id: number;

  @Column()
  //   static now will be retrieved from catalog DB company table
  company_id: number;

  @ManyToOne(() => Lov, (lov) => lov.id)
  @JoinColumn({ name: 'country_code' }) // Specify the name of the foreign key column here
  country_code: any;

  @Column({ default: () => 'NOW()' })
  created_date: Date;

  @Column({ default: true })
  active: boolean;

  // groups
  @ManyToOne(()=>Groups,(group_id)=>group_id.user_id)
  @JoinColumn({name:"group"})
  group_id:Groups


  // user_county (bidirectional)
  @OneToMany(() => User_County, (county_id) => county_id.user_id, { eager: false })
  county_id: User_County[];

  // user_filecounty(bidirectional)
  @OneToMany(() => User_fileType, (filetype_id) => filetype_id.user_id, { eager: false })
  filetype_id: User_fileType[];


}
