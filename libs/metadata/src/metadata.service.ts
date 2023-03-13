import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { METADATA_VALUE, COLUMN_METADATA, TAB_METADATA } from './constants'
import EntityMetadataInterface from './data/EntityMetadataInterface'
import 'reflect-metadata'
import { EntityNotListedException } from './exceptions/entity-not-listed.exception'

@Injectable()
export class MetadataService implements OnModuleInit {
  private readonly logger = new Logger(MetadataService.name)

  constructor(private readonly reflector: Reflector, private readonly entities: any[]) {
    try {
      this.findClassesWithDecorator(entities)
    } catch (error) {
      console.error(error)
    }
  }
  onModuleInit() {
    this.logger.log('Total Number of classes that are annotated with DefineMetadata: ' + this.myList.length)
  }

  private myList: any[] = []

  addMember(member: object) {
    this.myList.push(member)
  }

  getMetadataValueOfKey(title: string) {
    const metadata = this.myList.find((metadata) => metadata.value === title)
    if (metadata) {
      return metadata
    } else {
      throw new NotFoundException()
    }
  }

  private findClassesWithDecorator<T extends { new (...args: any[]): object }>(targetClasses: T[]) {
    const classes = targetClasses
    for (const classToProcess of classes) {
      const classValues = this.reflector.get<EntityMetadataInterface>(METADATA_VALUE, classToProcess)
      if (classValues) {
        classValues['columns'] = this.findColumnMetadataValuesOfClass(classToProcess)
        classValues['tabs'] = this.findMetaTabValuesOfClass(classToProcess)
        this.addMember(classValues)
      } else {
        throw new EntityNotListedException(classToProcess.name)
      }
    }
  }

  private findColumnMetadataValuesOfClass<T extends { new (...args: any[]): object }>(classToProcess: T): any[] {
    const classProperties = Object.getOwnPropertyNames(classToProcess)
    const columns = []
    classProperties.forEach((classProperty) => {
      const columnValue = Reflect.getMetadata(COLUMN_METADATA, classToProcess, classProperty)
      if (columnValue) columns.push(columnValue)
    })
    return columns
  }

  private findMetaTabValuesOfClass<T extends { new (...args: any[]): object }>(classToProcess: T): string[] {
    const classProperties = Object.getOwnPropertyNames(classToProcess)
    const tabs: string[] = []
    classProperties.forEach((classProperty) => {
      const tabValue = Reflect.getMetadata(TAB_METADATA, classToProcess, classProperty)
      if (tabValue) tabs.push(tabValue)
    })

    return tabs
  }
}
