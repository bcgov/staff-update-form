import Keycloak from 'keycloak-js';

let keycloakInstance;

export async function getKeycloak() {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url:      process.env.REACT_APP_KEYCLOAK_URL || 'https://dev.loginproxy.gov.bc.ca/auth',
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

  const now = new Date();
  const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  console.log(`login [${formattedDate}]: `, keycloakInstance.tokenParsed.idir_username);
  return keycloakInstance;
}

export function getUserEmail() {
  if (keycloakInstance && keycloakInstance.tokenParsed) {
    return keycloakInstance.tokenParsed.email;
  }
  return null;
}

export function getUserIDIR() {
  if (keycloakInstance && keycloakInstance.tokenParsed) {
    return keycloakInstance.tokenParsed.idir_username;
  }
  return null;
}
