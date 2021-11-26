import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('marks')
export class MarksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  reg_number: string;

  @Column({
    type: 'double',
    nullable: false,
  })
  gpa: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  passing_year: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  sequence: string;
}
