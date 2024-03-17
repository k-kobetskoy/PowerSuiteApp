import { IDisplayNameModel } from "./display-name.model"

export interface IEntityDefinitionModel {
    LogicalName: string,
    MetadataId: string,
    DisplayName: IDisplayNameModel
}