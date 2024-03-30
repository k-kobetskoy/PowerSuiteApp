import { IUserEnvironmentModel } from "./user-environment.model"

export interface IConnectionsDialogData {
    selectedEnv:IUserEnvironmentModel
    envList: IUserEnvironmentModel[]
}
