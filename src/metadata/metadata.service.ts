import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { DefineMetadata } from 'src/decorators/decorators'

@Injectable()
export class MetadataService implements OnModuleInit {
  private readonly logger = new Logger(MetadataService.name)

  constructor(private readonly reflector: Reflector, private readonly entities: any[]) {
    this.findClassesWithDecorator(entities, DefineMetadata)
  }
  onModuleInit() {
    this.logger.log('Total Number of classes that are annotated with DefineMetadata: ' + this.myList.length)
  }

  private myList: any[] = []

  addMember(member: object) {
    this.myList.push(member)
  }

  getMetadataValueOfKey(title: string) {
    const foundValue = this.myList.find((metadata) => metadata.classValues.title === title)
    if (foundValue !== undefined) {
      return foundValue.classValues
    } else {
      throw new NotFoundException()
    }
  }

  private findClassesWithDecorator<T extends { new (...args: any[]): object }>(
    targetClass: T[],
    decorator: any,
    processedClasses: Set<T> = new Set()
  ) {
    const classes = targetClass

    while (classes.length > 0) {
      const currentClass = classes.pop()
      if (!currentClass || processedClasses.has(currentClass)) {
        continue
      }
      processedClasses.add(currentClass)

      const classValues = this.reflector.get(decorator.name, currentClass)
      if (classValues) {
        this.addMember({ currentClass: currentClass, classValues: classValues })
      }
    }
  }
}
