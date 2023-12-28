import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Lov } from './lov.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  refresh_token: string | null;

  @Column({ nullable: true })
  expiry_token: Date | null;

  // @ManyToOne(() => Roles, role => role.users)
  // @JoinColumn({ name: 'role_id' }) // This sets a custom column name in the User table
  // role: Roles;

  @ManyToOne(() => Roles, (roles) => roles.id)
  @JoinColumn({ name: 'role_id' })
  role_id: Roles;

  @Column()
  //   static now will be retrieved from catalog DB company table
  tenant_id: number;

  @Column()
  //   static now will be retrieved from catalog DB company table
  company_id: number;

  @ManyToOne(() => Lov, (lov) => lov.id)
  @JoinColumn({ name: 'country_code' }) // Specify the name of the foreign key column here
  type: Lov;

  @Column({ default: () => 'NOW()' })
  created_date: Date;

  @Column({ default: true })
  active: boolean;
}
