import { type Locator, type Page } from '@playwright/test';

/** Catálogo de productos (/inventory.html) y encabezado con el carrito y el menú. */
export class InventarioPage {
  readonly titulo: Locator;
  readonly productos: Locator;
  readonly contadorCarrito: Locator;
  readonly iconoCarrito: Locator;

  constructor(readonly page: Page) {
    this.titulo = page.getByTestId('title');
    this.productos = page.getByTestId('inventory-item');
    this.contadorCarrito = page.getByTestId('shopping-cart-badge');
    this.iconoCarrito = page.getByTestId('shopping-cart-link');
  }

  /** La tarjeta de un producto, por su nombre. */
  tarjeta(producto: string): Locator {
    return this.productos.filter({ hasText: producto });
  }

  async agregar(producto: string): Promise<void> {
    await this.tarjeta(producto).getByRole('button', { name: 'Add to cart' }).click();
  }

  async quitar(producto: string): Promise<void> {
    await this.tarjeta(producto).getByRole('button', { name: 'Remove' }).click();
  }

  async abrirCarrito(): Promise<void> {
    await this.iconoCarrito.click();
  }

  async cerrarSesion(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
