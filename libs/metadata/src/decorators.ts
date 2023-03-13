/* eslint-disable @typescript-eslint/ban-types */
import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator'
import 'reflect-metadata'
import { COLUMN_METADATA, METADATA_VALUE, TAB_METADATA } from './constants'
import EntityMetadataInterface from './data/EntityMetadataInterface'
import ColumnMetadataInterface from './data/MetaColumnInterface'

export const ClassMetadata = (obj: EntityMetadataInterface) => SetMetadata(METADATA_VALUE, obj)

export function TabMetadata(tabType: string): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    Object.defineProperty(target.constructor, propertyKey, {
      get: function () {
        return this[`_${String(propertyKey)}`]
      },
      set: function (value: any) {
        this[`_${String(propertyKey)}`] = value
      }
    })
    Reflect.defineMetadata(TAB_METADATA, tabType, target.constructor, propertyKey)
  }
}

export function ColumnMetadata(options: ColumnMetadataInterface): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    Object.defineProperty(target.constructor, propertyKey, {
      get: function () {
        return this[`_${String(propertyKey)}`]
      },
      set: function (value: any) {
        this[`_${String(propertyKey)}`] = value
      }
    })
    Reflect.defineMetadata(COLUMN_METADATA, options, target.constructor, propertyKey)
  }
}
