import { Exclude, instanceToPlain } from 'class-transformer'
import { IsNotEmpty, Length } from 'class-validator'
import { ClassMetadata } from 'src/metadata/decorators'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@ClassMetadata({})
export class HelloEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @IsNotEmpty()
  @Length(1, 64)
  @Column({ length: 128, nullable: false, unique: true })
  email: string

  @IsNotEmpty()
  @Column({ nullable: false })
  fullName: string

  @IsNotEmpty()
  @Exclude()
  @Column({ nullable: false })
  password: string

  @IsNotEmpty()
  @Column({ nullable: false })
  dateOfBirth: Date

  @IsNotEmpty()
  @Column({ nullable: false })
  city: string

  @IsNotEmpty()
  @Column({ nullable: false })
  address: string

  @Column({ nullable: true })
  profileImage: string

  toJSON() {
    return instanceToPlain(this)
  }
}
