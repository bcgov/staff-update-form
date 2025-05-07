import Keycloak from 'keycloak-js';

let keycloakInstance;

export async function getKeycloak() {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: 'https://dev.loginproxy.gov.bc.ca/auth', // auth-server-url
      realm: 'standard',                            // realm
      clientId: 'staff-update-form-6031',           // resource
    });

    try {
      await keycloakInstance.init({ onLoad: 'login-required', checkLoginIframe: false });
    } catch (error) {
      console.error('Keycloak initialization failed:', error);
      throw error;
    }
  }
  return keycloakInstance;
}