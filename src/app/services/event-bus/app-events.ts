export const AppEvents = {
    USER_REMOVED: "eventBus:userRemoved",
    LOGIN_SUCCESS: "eventBus:loginSuccess",
    ENVIRONMENT_CHANGED: "eventBus:environmentChanged",
    NODE_SELECTED: "eventBus:nodeSelected",
    NODE_ADDED: "eventBus:nodeAdded",
    NODE_REMOVED: "eventBus:nodeRemoved",
} as const;
export type AppEvents = (typeof AppEvents)[keyof typeof AppEvents];
