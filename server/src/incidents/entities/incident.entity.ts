import {Entity, Column, ObjectIdColumn} from 'typeorm';

@Entity()
export class Incident {
  @ObjectIdColumn()
  id!: string;
  
  @ObjectIdColumn({name: 'id'})
  _id!: string;
  
  @Column({unique: true})
  incidentId: string;
  
  @Column()
  name: string;
  
  @Column()
  status: string;
  
  @Column()
  priority: string;
  
  @Column()
  country: string;
  
  @Column()
  history: any[];
  
  @Column({type: 'date'})
  createdAt: number;
  
  @Column({type: 'date'})
  updatedAt: number;
}
