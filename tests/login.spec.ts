import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventarioPage } from '../pages/InventarioPage';
import { CLAVE, CLAVE_INCORRECTA, MENSAJES, USUARIOS } from '../data/datos';

/**
 * MÓDULO LOGIN · casos del plan de pruebas (Jira, proyecto SCRUM).
 * Cada prueba lleva el ID del caso que automatiza.
 */

test.describe('Login', () => {
  test('CP-1.1 Login exitoso con standard_user', async ({ page }) => {
    const login = new LoginPage(page);
    const inventario = new InventarioPage(page);

    await login.abrir();
    await login.ingresar(USUARIOS.estandar, CLAVE);

    // Resultado esperado: redirige a /inventory.html y muestra el catálogo de 6 productos
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventario.productos).toHaveCount(6);
  });

  test('CP-2.1 Usuario inexistente', async ({ page }) => {
    const login = new LoginPage(page);

    await login.abrir();
    await login.ingresar(USUARIOS.inexistente, CLAVE);

    await expect(login.error).toHaveText(MENSAJES.noCoincide);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('CP-3.1 Contraseña incorrecta', async ({ page }) => {
    const login = new LoginPage(page);

    await login.abrir();
    await login.ingresar(USUARIOS.estandar, CLAVE_INCORRECTA);

    await expect(login.error).toHaveText(MENSAJES.noCoincide);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('CP-4.1 Campo usuario vacío', async ({ page }) => {
    const login = new LoginPage(page);

    await login.abrir();
    await login.ingresar('', CLAVE);

    await expect(login.error).toHaveText(MENSAJES.usuarioRequerido);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('CP-5.1 Campo contraseña vacío', async ({ page }) => {
    const login = new LoginPage(page);

    await login.abrir();
    await login.ingresar(USUARIOS.estandar, '');

    await expect(login.error).toHaveText(MENSAJES.claveRequerida);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('CP-6.1 Ambos campos vacíos', async ({ page }) => {
    const login = new LoginPage(page);

    await login.abrir();
    await login.ingresar('', '');

    // se valida primero el campo usuario
    await expect(login.error).toHaveText(MENSAJES.usuarioRequerido);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('CP-7.1 Login con locked_out_user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.abrir();
    await login.ingresar(USUARIOS.bloqueado, CLAVE);

    await expect(login.error).toHaveText(MENSAJES.bloqueado);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });

  test('CP-17.1 Logout desde el catálogo', async ({ page }) => {
    const login = new LoginPage(page);
    const inventario = new InventarioPage(page);
    await login.entrarComoEstandar();

    await inventario.cerrarSesion();

    // vuelve al login y ya no hay sesion: el catalogo no se puede abrir
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
    await expect(login.botonLogin).toBeVisible();
    await page.goto('/inventory.html');
    await expect(login.error).toHaveText(MENSAJES.sinSesion);
  });

  test('CP-18.1 Acceso directo por URL sin sesión', async ({ page }) => {
    const login = new LoginPage(page);

    // cada prueba arranca con un navegador limpio, sin cookies: no hay sesion
    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/saucedemo\.com\/$/);
    await expect(login.error).toHaveText(MENSAJES.sinSesion);
  });

  test('CP-146.1 Usuario con mayúsculas', async ({ page }) => {
    const login = new LoginPage(page);

    await login.abrir();
    await login.ingresar(USUARIOS.conMayusculas, CLAVE);

    await expect(login.error).toHaveText(MENSAJES.noCoincide);
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
  });
});
