import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC_KEY, METADATA_VALUE } from './decorator.constants'

export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true)

export const DefineMetadata = (obj: any) => SetMetadata(METADATA_VALUE, obj)
