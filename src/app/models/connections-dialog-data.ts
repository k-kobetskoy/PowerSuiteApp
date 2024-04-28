import { UserEnvironmentModel } from "./user-environment-model"

export interface ConnectionsDialogData {
    selectedEnv:UserEnvironmentModel
    envList: UserEnvironmentModel[]
}
