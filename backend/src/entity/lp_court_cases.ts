import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lpcases' })
export class LPcases {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'timestamptz' })
  casefile_date: Date | null;

  @Column({
    length: 100,
    type: 'varchar',
  })
  case_type: string;

  @Column({
    length: 100,
    type: 'varchar',
  })
  case_number: string;

  @Column({ type: 'text' })
  address: string;

  @Column('text', { array: true })
  defendants: string[];

  @Column('text', { array: true })
  plaintiffs: string[];

  @Column('money')
  estimated_claim: string | null;

  @Column('money')
  zillow: string | null;

  @Column('money')
  redfin: string | null;

  @Column({ type: 'timestamptz' })
  repoting_date: Date | null;

  @Column({
    length: 50,
    type: 'varchar',
  })
  case_status: string;

  @Column({ type: 'text' })
  county_name: string;
}
