import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo)
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await this.repo.findOne({
        where: {
          email: email
        }
      })

      if (result) return result
      this.throwNotFoundException('User')
    } catch (error) {
      console.error(error)
    }
  }
}
