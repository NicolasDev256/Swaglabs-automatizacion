import { type Locator, type Page } from '@playwright/test';

/** Carrito de compras (/cart.html). */
export class CarritoPage {
  readonly productos: Locator;
  readonly botonCheckout: Locator;

  constructor(readonly page: Page) {
    this.productos = page.getByTestId('inventory-item');
    this.botonCheckout = page.getByTestId('checkout');
  }

  async irAlCheckout(): Promise<void> {
    await this.botonCheckout.click();
  }
}
