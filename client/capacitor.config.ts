import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.veegee.app",
  appName: "Veegee Automation",
  webDir: "dist",
  server: {
    androidScheme: "https",
    hostname: "veegee-automation.app",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 500,
      launchAutoHide: true,
      showSpinner: false,
    },
  },
};

export default config;
