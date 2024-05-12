import { DisplayNameModel } from "./display-name-model"

export interface EntityDefinitionModel {
    LogicalName: string,
    DisplayName: DisplayNameModel,
    EntitySetName: string
}