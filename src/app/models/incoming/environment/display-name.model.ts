import { ILabelModel } from "./label.model"

export interface IDisplayNameModel {
    LocalizedLabels: ILabelModel[],
    UserLocalizedLabel: ILabelModel
}