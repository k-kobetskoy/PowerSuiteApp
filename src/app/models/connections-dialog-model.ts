import { EnvironmentModel } from "./environment-model"

export interface ConnectionsDialogModel {
    selectedEnv:EnvironmentModel
    envList: EnvironmentModel[]
}
