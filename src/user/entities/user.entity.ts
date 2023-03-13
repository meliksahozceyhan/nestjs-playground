import { instanceToPlain } from 'class-transformer'
import { IsNotEmpty, Length } from 'class-validator'
import { ClassMetadata, ColumnMetadata } from '@meliksahozceyhan/metadata'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@ClassMetadata({
  permission: 'user',
  value: 'user',
  addable: true,
  deletable: true,
  baseUrl: 'api/v1/user',
  detailTitle: 'email',
  responseKey: 'users',
  getUrl: '/getUsers'
})
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @IsNotEmpty()
  @Length(1, 64)
  @ApiProperty()
  @Column({ length: 128, nullable: false, unique: true })
  email: string

  @IsNotEmpty()
  @ApiProperty()
  @Column({ nullable: false })
  @ColumnMetadata({
    addable: true,
    formType: 'textfield',
    getUrl: '',
    itemKey: 'fullName',
    searchable: true,
    searchKey: 'fullName',
    showInTable: true,
    sortable: true,
    width: 30
  })
  fullName: string

  @IsNotEmpty()
  @ApiProperty()
  @Column({ nullable: false })
  password: string

  @IsNotEmpty()
  @ApiProperty()
  @Column({ nullable: false })
  dateOfBirth: Date

  @IsNotEmpty()
  @ApiProperty()
  @Column({ nullable: false })
  @ColumnMetadata({
    addable: true,
    formType: 'textfield',
    getUrl: '',
    itemKey: 'city',
    searchable: true,
    searchKey: 'city',
    showInTable: true,
    sortable: true,
    width: 30
  })
  city: string

  @IsNotEmpty()
  @ApiProperty()
  @Column({ nullable: false })
  address: string

  @Column({ nullable: true })
  @ApiProperty()
  profileImage: string

  toJSON() {
    return instanceToPlain(this)
  }
}
