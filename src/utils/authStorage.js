import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:token`);
      return token ? JSON.parse(token) : null;
    } catch (e) {
      console.error('Error getting access token from storage', e);
      return null;
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:token`,
        JSON.stringify(accessToken),
      );
    } catch (e) {
      console.error('Error setting access token in storage', e);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:token`);
    } catch (e) {
      console.error('Error removing access token from storage', e);
    }
  }
}

export default AuthStorage;
