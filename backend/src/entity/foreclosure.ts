import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'foreclosure' })
export class foreclosure {
  @Column({ type: 'timestamptz' })
  auction_date: Date | null;

  @PrimaryColumn({
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
  judgement: string|null;

  @Column('money')
  zillow: string|null;

  @Column('money')
  redfin: string|null;

  @Column({
    length: 20,
    type: 'varchar',
  })
  reporting_date: string;

  @Column({
    length: 50,
    type: 'varchar',
  })
  status: string;

  @PrimaryColumn({
    length: 50,
    type: 'varchar',
  })
  internal_case_id: string;

  @Column('text', { array: true })
  user_comments: string[]|null;

  @Column({ type: 'text' })
  county_name: string;
}
