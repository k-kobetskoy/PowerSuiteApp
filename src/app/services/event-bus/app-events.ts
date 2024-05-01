export const AppEvents = {
    USER_REMOVED: "eventBus:userRemoved",
    LOGIN_SUCCESS: "eventBus:loginSuccess",
    ENVIRONMENT_CHANGED: "eventBus:environmentChanged"
} as const;
export type AppEvents = (typeof AppEvents)[keyof typeof AppEvents];
