import { AttributeValidationTypes } from './../constants/attribute-validation-types';
import { debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { IAttributeValidator } from "../abstract/i-attribute-validator";
import { NodeAttribute } from '../../../models/node-attribute';
import { IAttributeValidationResult } from '../abstract/i-attribute-validation-result';

export class AttributeTypeValidator implements IAttributeValidator {

    constructor(private validationType: string) { }

    getValidator(attribute: NodeAttribute): () => IAttributeValidationResult
    {
        switch (this.validationType) {
            case AttributeValidationTypes.typeNumber:
                return () => this.validateNumber(attribute);
            case AttributeValidationTypes.typeBoolean:
                return () => this.validateBoolean(attribute);
            default:
                return () => { return { isValid$: of(true), errorMessage: '' } };
        }
    }

    private validateBoolean(attribute: NodeAttribute): IAttributeValidationResult {
        const isValid = attribute.value$.pipe(
            distinctUntilChanged(),
            debounceTime(300),
            map(value => this.isBoolean(value))
        );

        return {
            isValid$: isValid,
            errorMessage: `The value for attribute '${attribute.name}' must be a boolean.`
        };
    }

    private validateNumber(attribute: NodeAttribute): IAttributeValidationResult {
        const isValid = attribute.value$.pipe(
            distinctUntilChanged(),
            debounceTime(300),
            map(value => this.isNumber(value))
        );

        return {
            isValid$: isValid,
            errorMessage: `The value for attribute '${attribute.name}' must be a number.`
        };
    }

    private isNumber(value: string): boolean {
        const trimmedValue = value.trim();

        return trimmedValue === '' || !isNaN(Number(trimmedValue));
    }

    private isBoolean(value: string): boolean {

        const trimmedValue = value.trim().toLowerCase();

        return trimmedValue === '' || trimmedValue === 'true' || trimmedValue === 'false';
    }
}
