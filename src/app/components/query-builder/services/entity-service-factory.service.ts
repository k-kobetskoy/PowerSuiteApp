import { Injectable } from '@angular/core';
import { NotImplementError } from 'src/app/models/errors/not-implement-error';
import { EntityEntityService } from './entity-services/entity-entity.service';
import { AttributeEntityService } from './entity-services/attribute-entity.service';
import { BooleanEntityService } from './entity-services/boolean-entity.service';
import { PicklistEntityService } from './entity-services/picklist-entity.service';

@Injectable({ providedIn: 'root' })
export class EntityServiceFactoryService {

  constructor(
    private entityServcie: EntityEntityService, 
    private attributeService: AttributeEntityService,
    private booleanService: BooleanEntityService,
    private picklistService: PicklistEntityService) { }


  getEntityService(serviceName: string): EntityEntityService|AttributeEntityService|BooleanEntityService|PicklistEntityService {
    switch (serviceName) {
      case 'Entity':
        return this.entityServcie;
      case 'Attribute':
        return this.attributeService;
      case 'Boolean':
        return this.booleanService;
      case 'picklist':
        return this.picklistService;
      default:
        throw new NotImplementError(`Couldn't find node type with the name: ${serviceName}`)
    }
  }
}
