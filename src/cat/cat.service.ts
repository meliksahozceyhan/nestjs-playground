import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { Cat } from './entities/cat.entity'
@Injectable()
export class CatService extends TypeOrmCrudService<Cat> {
  constructor(@InjectRepository(Cat) repo: Repository<Cat>) {
    super(repo)
  }

  public async getAll(): Promise<Cat[]> {
    return await this.repo.find()
  }
}
