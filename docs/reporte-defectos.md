# Reporte de defectos

Defectos que detecta la suite automatizada. Los dos ya están reportados en Jira (proyecto SCRUM). En el código, cada prueba que los detecta está marcada con `test.fail(true, 'CLAVE · …')`: la suite queda en verde y el día que se corrija el defecto Playwright avisará con "Expected to fail, but passed".

---

## SCRUM-361 · [Carrito] No se muestra mensaje ni estado de carrito vacío

| Campo | Detalle |
|---|---|
| **ID** | SCRUM-361 |
| **Severidad** | 4 (menor) |
| **Módulo** | Carrito |
| **Caso que lo detecta** | CP-62.1 · Abrir carrito vacío · `tests/carrito.spec.ts` |
| **Entorno** | https://www.saucedemo.com · Chromium (Playwright) · Windows 11 y Ubuntu 24.04 (GitHub Actions) |
| **Precondiciones** | Login con standard_user / secret_sauce, carrito vacío. |
| **Pasos para reproducir** | 1. Iniciar sesión. 2. Sin agregar productos, clic en el ícono del carrito. |
| **Resultado esperado** | /cart.html sin productos y un mensaje que indica que el carrito está vacío. |
| **Resultado obtenido** | /cart.html muestra solo los encabezados "QTY" y "Description" y los botones, sin ningún mensaje. Playwright: `getByText(/your cart is empty/i)` → *element(s) not found*. |
| **Evidencia** | Captura y trace en el reporte HTML de Playwright (prueba CP-62.1). |
| **Reproducibilidad** | Siempre (3 de 3 ejecuciones). |

---

## SCRUM-365 · [Checkout] Los campos del formulario aceptan caracteres inválidos

| Campo | Detalle |
|---|---|
| **ID** | SCRUM-365 |
| **Severidad** | 3 (media) |
| **Módulo** | Checkout |
| **Caso que lo detecta** | CP-97.1 · Código postal con letras y símbolos · `tests/checkout.spec.ts` |
| **Entorno** | https://www.saucedemo.com · Chromium (Playwright) · Windows 11 y Ubuntu 24.04 (GitHub Actions) |
| **Precondiciones** | standard_user con Sauce Labs Backpack + Sauce Labs Bike Light en el carrito, en /checkout-step-one.html. |
| **Pasos para reproducir** | 1. First Name: Ana. 2. Last Name: Pérez. 3. Postal Code: abc!@#. 4. Clic en Continue. |
| **Resultado esperado** | Mensaje de error en el formulario y permanece en /checkout-step-one.html. |
| **Resultado obtenido** | No muestra ningún error y avanza a /checkout-step-two.html (Checkout: Overview). Playwright: `getByTestId('error')` → *element(s) not found*. |
| **Evidencia** | Captura y trace en el reporte HTML de Playwright (prueba CP-97.1). |
| **Reproducibilidad** | Siempre (3 de 3 ejecuciones). |
