import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductEntity {
    @PrimaryColumn()
    ean!: string;
   
    @Column()
    name!: string;
    
    @Column()
    unit!: string;
    
    @Column()
    stock!: number;
}
