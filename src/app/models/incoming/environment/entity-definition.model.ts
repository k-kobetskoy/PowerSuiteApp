import { DisplayNameModel } from "./display-name.model"

export interface EntityDefinitionModel {
    LogicalName: string,
    MetadataId: string,
    DisplayName: DisplayNameModel
}