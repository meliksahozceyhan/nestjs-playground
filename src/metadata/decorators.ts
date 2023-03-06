import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator'

export const METADATA_VALUE = 'CLASS_METADATA'
export const ClassMetadata = (obj: any) => SetMetadata(METADATA_VALUE, obj)
