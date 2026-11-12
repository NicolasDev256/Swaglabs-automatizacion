import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventarioPage } from '../pages/InventarioPage';
import { CarritoPage } from '../pages/CarritoPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CLIENTE, MENSAJES, PRODUCTOS, RESUMEN } from '../data/datos';

/**
 * MÓDULO CHECKOUT · casos del plan de pruebas (Jira, proyecto SCRUM).
 * Precondición común: standard_user con Sauce Labs Backpack + Sauce Labs Bike Light
 * en el carrito, en /checkout-step-one.html.
 */

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const inventario = new InventarioPage(page);
    await new LoginPage(page).entrarComoEstandar();
    await inventario.agregar(PRODUCTOS.mochila);
    await inventario.agregar(PRODUCTOS.luz);
    await inventario.abrirCarrito();
    await new CarritoPage(page).irAlCheckout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('CP-75.1 Nombre vacío', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.llenarDatos({ apellido: CLIENTE.apellido, postal: CLIENTE.postal });

    await expect(checkout.error).toHaveText(MENSAJES.nombreRequerido);
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('CP-76.1 Apellido vacío', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.llenarDatos({ nombre: CLIENTE.nombre, postal: CLIENTE.postal });

    await expect(checkout.error).toHaveText(MENSAJES.apellidoRequerido);
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('CP-77.1 Código postal vacío', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.llenarDatos({ nombre: CLIENTE.nombre, apellido: CLIENTE.apellido });

    await expect(checkout.error).toHaveText(MENSAJES.postalRequerido);
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('CP-85.1 Total', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await checkout.llenarDatos({ nombre: CLIENTE.nombre, apellido: CLIENTE.apellido, postal: CLIENTE.postal });

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkout.subtotal).toHaveText(RESUMEN.subtotal);
    await expect(checkout.impuesto).toHaveText(RESUMEN.impuesto);
    await expect(checkout.total).toHaveText(RESUMEN.total);
  });

  test('CP-89.1 Checkout: Complete!', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.llenarDatos({ nombre: CLIENTE.nombre, apellido: CLIENTE.apellido, postal: CLIENTE.postal });

    await checkout.finalizar();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.getByTestId('title')).toHaveText('Checkout: Complete!');
    await expect(page.getByTestId('pony-express')).toBeVisible();
  });

  test('CP-97.1 Código postal con letras y símbolos', async ({ page }) => {
    test.fail(true, 'SCRUM-365 · Los campos del formulario aceptan caracteres inválidos');
    const checkout = new CheckoutPage(page);

    await checkout.llenarDatos({ nombre: CLIENTE.nombre, apellido: CLIENTE.apellido, postal: CLIENTE.postalInvalido });

    // resultado esperado: se rechaza con un mensaje de error y no avanza
    await expect(checkout.error).toBeVisible();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});
