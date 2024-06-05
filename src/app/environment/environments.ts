export const environment = {
    production: false,
    apiUrl: 'http://localhost:5001/admin/realms/Academic',
    serverUrl: 'http://localhost:4001/api',
    keycloakConfig: {
        clientId:"client-academic",
        issuer: 'http://localhost:5001/realms/Academic',
        tokenEndpoint: 'http://localhost:5001/realms/Academic/protocol/openid-connect/token',
        responseType: 'code',
        scope: 'openid profile',
        showDebugInformation: true,
        clave: 'R8QDxlT5BmeBoyw9KPXtMqjcD2P5DzCJ',
    }
  };
