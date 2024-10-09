import { AttributeValidationTypes } from './../constants/attribute-validation-types';
import { of, distinctUntilChanged, debounceTime, map, Observable, switchMap } from "rxjs";
import { NodeAttribute } from "../../../models/node-attribute";
import { IAttributeValidationResult } from "../abstract/i-attribute-validation-result";
import { EntityServiceFactoryService } from "../../entity-service-factory.service";
import { EntityEntityService } from "../../entity-services/entity-entity.service";
import { IAttributeValidator } from "../abstract/i-attribute-validator";

export class AttributeServerValidator implements IAttributeValidator {

    constructor(private validationType: string, private entityServiceFactory: EntityServiceFactoryService) { }

    getValidator(attribute: NodeAttribute): () => IAttributeValidationResult {
        switch (this.validationType) {
            case AttributeValidationTypes.serverEntity:
                return () => this.validateEntity(attribute);
            default:
                return () => { return { isValid$: of(true), errorMessage: '' } };
        }
    }

    private validateEntity(attribute: NodeAttribute): IAttributeValidationResult {
        const entityService = this.entityServiceFactory.getEntityService(this.validationType) as EntityEntityService;

        const isValid: Observable<boolean> = entityService.getEntities().pipe(
            distinctUntilChanged(),
            switchMap(entities => {
                return attribute.value$.pipe(
                    distinctUntilChanged(),
                    debounceTime(500),
                    map(entityName => {
                        if (!entityName) {
                            return true;
                        } else {
                            const entity = entities.find(e => e.logicalName === entityName);
                            return !!entity;
                        }
                    })
                );
            })
        );

        return {
            isValid$: isValid,
            errorMessage: `Entity with provided name not found.`
        };
    }
}