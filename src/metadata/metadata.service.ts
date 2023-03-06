import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { METADATA_VALUE } from './decorators'
import { EntityNotListedException } from './exceptions/entity-not-listed.exception'

@Injectable()
export class MetadataService implements OnModuleInit {
  private readonly logger = new Logger(MetadataService.name)

  constructor(private readonly reflector: Reflector, private readonly entities: any[]) {
    try {
      this.findClassesWithDecorator(entities, METADATA_VALUE)
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
    const foundValue = this.myList.find((metadata) => metadata.classValues.value === title)
    if (foundValue !== undefined) {
      return foundValue.classValues
    } else {
      throw new NotFoundException()
    }
  }

  private findClassesWithDecorator<T extends { new (...args: any[]): object }>(targetClasses: T[], decorator: any) {
    const classes = targetClasses
    console.log(classes)
    for (const classToProcess of classes) {
      const classValues = this.reflector.get(decorator, classToProcess)
      console.log(classValues)
      if (classValues) {
        this.addMember({ currentClass: classToProcess, classValues: classValues })
      } else {
        throw new EntityNotListedException(classToProcess.name)
      }
    }
  }
}
