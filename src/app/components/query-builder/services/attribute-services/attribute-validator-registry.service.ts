import { AttributeConditionValidator } from './validators/attribute-condition-validator';
import { AttributeStringValueValidator } from './validators/attribute-string-value-validator';
import { Injectable } from '@angular/core';
import { IAttributeValidator } from './abstract/i-attribute-validator';
import { AttributeTypeValidator } from './validators/attribute-type-validator';
import { EntityServiceFactoryService } from '../entity-service-factory.service';
import { AttributeServerValidator } from './validators/attribute-server-validator';
import { AttributeListValidator } from './validators/attribute-list-validator';

@Injectable({ providedIn: 'root' })

export class AttributeValidatorRegistryService {

  private _typeValidators = new Map<string, IAttributeValidator>();  
  private _serverValidators = new Map<string, IAttributeValidator>();
  private _stringValidators = new Map<string, IAttributeValidator>();
  private _conditionValidators = new Map<string, IAttributeValidator>();
  private _listValidators = new Map<string, IAttributeValidator>();

  constructor(private entityServiceFactory: EntityServiceFactoryService) { }

  type(type: string): IAttributeValidator {    
    return this._typeValidators.has(type) ? this._typeValidators.get(type) : this.registerTypeValidator(type);    
  }

  server(type: string): IAttributeValidator {
    return this._serverValidators.has(type) ? this._serverValidators.get(type) : this.registerServerValidator(type);
  }

  string(type: string): IAttributeValidator {
    return this._stringValidators.has(type) ? this._stringValidators.get(type) : this.registerStringValidator(type);
  }

  condition(type: string): IAttributeValidator {
    return this._conditionValidators.has(type) ? this._conditionValidators.get(type) : this.registerConditionValidator(type);
  }

  list(type: string): IAttributeValidator {
    return this._listValidators.has(type) ? this._listValidators.get(type) : this.registerListValidator(type);
  }

  private registerTypeValidator(type: string): IAttributeValidator {
    const validator =  new AttributeTypeValidator(type);

    this._typeValidators.set(type, validator);

    return validator;
  }

  private registerServerValidator(type: string): IAttributeValidator {
    const validator = new AttributeServerValidator(type, this.entityServiceFactory);

    this._serverValidators.set(type, validator);

    return validator;
  }  

  private registerStringValidator(type: string): IAttributeValidator {
    const validator = new AttributeStringValueValidator(type);

    this._stringValidators.set(type, validator);

    return validator;
  }

  private registerConditionValidator(type: string): IAttributeValidator {
    const validator = new AttributeConditionValidator(type);
    
    this._conditionValidators.set(type, validator);

    return validator;
  }

  private registerListValidator(type: string): IAttributeValidator {
    const validator = new AttributeListValidator(type);

    this._listValidators.set(type, validator);

    return validator;
  }
}
