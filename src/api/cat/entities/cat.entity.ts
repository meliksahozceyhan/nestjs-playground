import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ClassMetadata, ColumnMetadata } from '@meliksahozceyhan/metadata'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ClassMetadata({
  permission: 'cat',
  value: 'cat',
  addable: true,
  deletable: true,
  baseUrl: '/api/v1/cat',
  getUrl: '/getCats',
  detailTitle: 'catName',
  responseKey: 'cats'
})
@Entity('cat')
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
  @ColumnMetadata({
    addable: true,
    formType: 'textfield',
    getUrl: '',
    itemKey: 'catName',
    searchable: true,
    searchKey: 'catName',
    showInTable: true,
    sortable: true,
    width: 30
  })
  catName: string

  @IsNotEmpty()
  @ApiProperty()
  @Column({ name: 'gender', nullable: false })
  gender: string

  @IsNotEmpty()
  @ApiProperty()
  @Column({ name: 'species', nullable: false })
  species: string
}
