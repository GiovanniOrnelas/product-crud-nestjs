import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    ean!: string;
   
    @Column()
    name!: string;
    
    @Column()
    unit!: string;
    
    @Column()
    stock!: number;
}
