export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: '69111799-c2ca-490f-929f-4e5ee63b9792',
            authority: 'https://login.microsoftonline.com/common/oauth2/authorize?resource=https://globaldisco.crm.dynamics.com'
        }
    },
    apiConfig: {
        scopes: ['https://globaldisco.crm.dynamics.com/user_impersonation'],
        uri: 'https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances'
    }
  };