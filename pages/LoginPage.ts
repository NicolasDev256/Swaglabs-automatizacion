import { type Locator, type Page } from '@playwright/test';
import { CLAVE, USUARIOS } from '../data/datos';

/** Pantalla de inicio de sesión de Swag Labs. */
export class LoginPage {
  readonly usuario: Locator;
  readonly clave: Locator;
  readonly botonLogin: Locator;
  readonly error: Locator;

  constructor(readonly page: Page) {
    this.usuario = page.getByTestId('username');
    this.clave = page.getByTestId('password');
    this.botonLogin = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
  }

  async abrir(): Promise<void> {
    await this.page.goto('/');
  }

  /** Escribe usuario y clave (si vienen vacios no escribe nada) y presiona Login. */
  async ingresar(usuario: string, clave: string): Promise<void> {
    if (usuario) await this.usuario.fill(usuario);
    if (clave) await this.clave.fill(clave);
    await this.botonLogin.click();
  }

  /** Atajo para las pruebas que necesitan empezar con sesion iniciada. */
  async entrarComoEstandar(): Promise<void> {
    await this.abrir();
    await this.ingresar(USUARIOS.estandar, CLAVE);
    await this.page.waitForURL('**/inventory.html');
  }
}
