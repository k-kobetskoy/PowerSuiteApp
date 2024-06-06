export const AttributeTypes = {
    BIG_INT: 'BigInt',
    BOOLEAN: 'Boolean',
    CALENDAR_RULES: 'CalendarRules',
    CUSTOMER: 'Customer',
    DATE_TIME: 'DateTime',
    DECIMAL: 'Decimal',
    DOUBLE: 'Double',
    INTEGER: 'Integer',
    LOOKUP: 'Lookup',
    MANAGED_PROPERTY: 'ManagedProperty',
    MEMO: 'Memo',
    MONEY: 'Money',
    OWNER: 'Owner',
    PARTY_LIST: 'PartyList',
    PICKLIST: 'Picklist',
    STATE: 'State',
    STATUS: 'Status',
    STRING: 'String',
    UNIQUE_IDENTIFIER: 'Uniqueidentifier'
} as const;
export type AttributeTypes = (typeof AttributeTypes)[keyof typeof AttributeTypes];
