import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventarioPage } from '../pages/InventarioPage';
import { CarritoPage } from '../pages/CarritoPage';
import { PRODUCTOS } from '../data/datos';

/**
 * MÓDULO CARRITO · casos del plan de pruebas (Jira, proyecto SCRUM).
 * Precondición común: login exitoso con standard_user y carrito vacío.
 */

test.describe('Carrito', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).entrarComoEstandar();
  });

  test('CP-39.1 Contador con dos productos', async ({ page }) => {
    const inventario = new InventarioPage(page);

    await inventario.agregar(PRODUCTOS.mochila);
    await expect(inventario.contadorCarrito).toHaveText('1');

    await inventario.agregar(PRODUCTOS.luz);
    await expect(inventario.contadorCarrito).toHaveText('2');
  });

  test('CP-40.1 Contador al quitar el último producto (valor límite 1 → 0)', async ({ page }) => {
    const inventario = new InventarioPage(page);
    await inventario.agregar(PRODUCTOS.mochila);
    await expect(inventario.contadorCarrito).toHaveText('1');

    await inventario.quitar(PRODUCTOS.mochila);

    // el contador desaparece del ícono (no muestra 0)
    await expect(inventario.contadorCarrito).toHaveCount(0);
  });

  test('CP-61.1 Seis productos (valor límite: todo el catálogo)', async ({ page }) => {
    const inventario = new InventarioPage(page);
    const carrito = new CarritoPage(page);

    for (const producto of PRODUCTOS.todos) {
      await inventario.agregar(producto);
    }
    await expect(inventario.contadorCarrito).toHaveText('6');

    await inventario.abrirCarrito();
    await expect(carrito.productos).toHaveCount(6);
    for (const producto of PRODUCTOS.todos) {
      await expect(carrito.productos.filter({ hasText: producto })).toHaveCount(1);
    }
  });

  test('CP-62.1 Abrir carrito vacío (valor límite 0 productos)', async ({ page }) => {
    test.fail(true, 'SCRUM-361 · No se muestra mensaje ni estado de carrito vacío');
    const inventario = new InventarioPage(page);
    const carrito = new CarritoPage(page);

    await inventario.abrirCarrito();

    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(carrito.productos).toHaveCount(0);
    // resultado esperado corregido: un mensaje que diga que el carrito está vacío
    await expect(page.getByText(/your cart is empty|carrito está vacío/i)).toBeVisible();
  });
});
