import { Controller, Get } from '@nestjs/common'
import { Crud, CrudController } from '@nestjsx/crud'
import { CatService } from './cat.service'
import { Cat } from './entities/cat.entity'

@Crud({
  model: {
    type: Cat
  },
  params: {
    id: { field: 'id', type: 'uuid', primary: true }
  }
})
@Controller('/cat')
export class CatController implements CrudController<Cat> {
  constructor(public service: CatService) {}

  @Get('hello-darkness')
  public async deneme() {
    return []
  }
}
