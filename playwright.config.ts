import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  testMatch: 'footer.spec.ts',
  timeout: 120000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 2,
  reporter: [['dot'], ['allure-playwright']],
  use: {
    baseURL: 'https://stage.rentzila.com.ua/',
    screenshot: 'off',
    video: 'off'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});
