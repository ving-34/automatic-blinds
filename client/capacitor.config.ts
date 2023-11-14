import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.veegee.app',
  appName: 'Veegee Automation',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
