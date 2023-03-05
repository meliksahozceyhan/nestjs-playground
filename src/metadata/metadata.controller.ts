import { Controller, Get, Param } from '@nestjs/common'
import { MetadataService } from './metadata.service'

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get(':title')
  getMetadataOfObject(@Param('title') title: string) {
    return this.metadataService.getMetadataValueOfKey(title)
  }
}
