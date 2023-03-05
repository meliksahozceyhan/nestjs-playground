import { Injectable } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { DefineMetadata } from 'src/decorators/decorators'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@DefineMetadata({ permission: 'cat', urlPrefix: 'Hello', title: 'cat' })
@Injectable()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @IsNotEmpty()
  @ApiProperty()
  @Column({ name: 'cat_name', nullable: false })
  catName: string

  @IsNotEmpty()
  @ApiProperty()
  @Column({ name: 'gender', nullable: false })
  gender: string

  @IsNotEmpty()
  @ApiProperty()
  @Column({ name: 'species', nullable: false })
  species: string

  @ApiProperty()
  @Column({ name: 'name', nullable: true })
  name: string
}
