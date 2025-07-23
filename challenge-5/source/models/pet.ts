import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'pet' })
export class PetModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255, nullable: false })
  name: string

  @Column({ type: 'varchar', length: 50, nullable: true })
  species: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  breed: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
