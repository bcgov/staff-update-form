import Keycloak from 'keycloak-js';

let keycloakInstance;

export async function getKeycloak() {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url:      process.env.REACT_APP_KEYCLOAK_URL,
      realm:    'standard',
      clientId: 'staff-update-form-6031'
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