import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('AUDITS')
export class Audit {
  @PrimaryGeneratedColumn({ name: "COMMAND_ID" })
  commandId: number;

  @Column({ name: "TABLE_NAME"})
  tableName: string;

  @Column({ name: "ACTION_DATE" })
  actionDate: string;

  @Column({ name: "COMMAND" })
  command: string;
}
