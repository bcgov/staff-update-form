import Keycloak from 'keycloak-js';

// Initialize Keycloak with the installation JSON
const keycloak = new Keycloak({
  url: 'https://dev.loginproxy.gov.bc.ca/auth', // auth-server-url
  realm: 'standard',                            // realm
  clientId: 'staff-update-form-6031',           // resource
});

export default keycloak;