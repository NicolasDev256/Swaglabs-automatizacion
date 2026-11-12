import { type Locator, type Page } from '@playwright/test';

/** Pasos del checkout: datos del cliente, resumen y confirmación. */
export class CheckoutPage {
  readonly nombre: Locator;
  readonly apellido: Locator;
  readonly postal: Locator;
  readonly botonContinuar: Locator;
  readonly error: Locator;
  readonly subtotal: Locator;
  readonly impuesto: Locator;
  readonly total: Locator;
  readonly botonFinalizar: Locator;
  readonly mensajeFinal: Locator;

  constructor(readonly page: Page) {
    this.nombre = page.getByTestId('firstName');
    this.apellido = page.getByTestId('lastName');
    this.postal = page.getByTestId('postalCode');
    this.botonContinuar = page.getByTestId('continue');
    this.error = page.getByTestId('error');
    this.subtotal = page.getByTestId('subtotal-label');
    this.impuesto = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.botonFinalizar = page.getByTestId('finish');
    this.mensajeFinal = page.getByTestId('complete-header');
  }

  /** Llena los campos que reciba; los que no vienen se dejan vacios. */
  async llenarDatos(datos: { nombre?: string; apellido?: string; postal?: string }): Promise<void> {
    if (datos.nombre) await this.nombre.fill(datos.nombre);
    if (datos.apellido) await this.apellido.fill(datos.apellido);
    if (datos.postal) await this.postal.fill(datos.postal);
    await this.botonContinuar.click();
  }

  async finalizar(): Promise<void> {
    await this.botonFinalizar.click();
  }
}
