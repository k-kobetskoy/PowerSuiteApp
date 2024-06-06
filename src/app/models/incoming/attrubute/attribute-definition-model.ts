import { DisplayNameModel } from "../environment/display-name-model";

export interface AttributeDefinitionModel {
    LogicalName: string,
    MetadataId: string,
    AttributeType: string,
    DisplayName: DisplayNameModel,
}
