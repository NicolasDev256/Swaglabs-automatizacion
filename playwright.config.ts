import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30_000,
  expect: { timeout: 5_000 },

  // cada prueba es independiente, asi que pueden correr en paralelo
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,

  // reporte en la terminal + reporte HTML (npm run report)
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'https://www.saucedemo.com',
    // Swag Labs trae atributos data-test en sus elementos: son selectores estables
    testIdAttribute: 'data-test',
    screenshot: 'on',
    // video de cada prueba: sirve como evidencia de una ejecucion completa
    video: 'on',
    trace: 'retain-on-failure',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
