import { of, Observable, distinctUntilChanged, switchMap, debounceTime, map } from "rxjs";
import { DataverseEntityTypeNames } from "../../../models/constants/dataverse-entity-type-names";
import { NodeAttribute } from "../../../models/node-attribute";
import { IAttributeValidationResult } from "../abstract/i-attribute-validation-result";
import { IAttributeValidator } from "../abstract/i-attribute-validator";

export class AttributeConditionValidator implements IAttributeValidator {

    constructor(private validationType: string) { }

    getValidator(attribute: NodeAttribute): () => IAttributeValidationResult {
        switch (this.validationType) {
            case DataverseEntityTypeNames.entity:
                return () => { return { isValid$: of(true), errorMessage: '' } };
            default:
                return () => { return { isValid$: of(true), errorMessage: '' } };
        }
    }
}