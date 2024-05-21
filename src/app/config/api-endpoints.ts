export const API_ENDPOINTS = {
    environments: {
        base: 'https://globaldisco.crm.dynamics.com/api/discovery/v2.0',
        instances: 'Instances',
        getResourceUrl() { return `${this.base}/${this.instances}`; }
    },
    entities: {
        entityParameters: ['LogicalName', 'DisplayName', 'EntitySetName'],
        getResourceUrl(apiUrl: string) { return `${apiUrl}/api/data/v9.2/EntityDefinitions?$select=${this.entityParameters.join(',')}`; }
    },
    attributes: {       
        attributeParameters : ['LogicalName', 'DisplayName', 'AttributeType'],
        getResourceUrl(apiUrl: string, entityLogicalName: string) { return `${apiUrl}/api/data/v9.2/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes?$select=${this.attributeParameters.join(',')}?$filter=AttributeType ne 'Virtual'`; }
    },
};



