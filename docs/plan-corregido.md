# Plan de pruebas corregido · Swag Labs

**Sistema bajo prueba:** Swag Labs · https://www.saucedemo.com
**Plan completo:** Jira, proyecto SCRUM (170 historias, 178 casos de prueba, tareas "Plan de pruebas · SCRUM-n").
**Alcance de la automatización:** Opción B, 20 casos de los módulos Login, Carrito y Checkout.
**Herramienta:** Playwright + TypeScript.

Este documento tiene la versión corregida de los 20 casos que se automatizan. Los cambios frente a la versión de mitad de semestre están en [tabla-cambios.md](tabla-cambios.md).

Tipos: **P** = positivo · **N** = negativo · **VL** = valor límite.

---

## Módulo Login

### CP-1.1 · Login exitoso con standard_user (P)
- **Historia:** SCRUM-1 · Iniciar sesión con standard_user
- **Precondiciones:** En https://www.saucedemo.com/, sin sesión iniciada.
- **Pasos:** 1. Ingresar "standard_user" en Username. 2. Ingresar "secret_sauce" en Password. 3. Clic en Login.
- **Datos:** standard_user / secret_sauce
- **Resultado esperado:** Redirige a /inventory.html y muestra el catálogo con 6 productos.

### CP-2.1 · Usuario inexistente (N)
- **Historia:** SCRUM-2 · Error por usuario inexistente
- **Precondiciones:** En https://www.saucedemo.com/, sin sesión iniciada.
- **Pasos:** 1. Ingresar "usuario_invalido" en Username. 2. Ingresar "secret_sauce" en Password. 3. Clic en Login.
- **Datos:** usuario_invalido / secret_sauce
- **Resultado esperado:** Mensaje "Epic sadface: Username and password do not match any user in this service" y permanece en https://www.saucedemo.com/.

### CP-3.1 · Contraseña incorrecta (N)
- **Historia:** SCRUM-3 · Error por contraseña incorrecta
- **Precondiciones:** En https://www.saucedemo.com/, sin sesión iniciada.
- **Pasos:** 1. Ingresar "standard_user" en Username. 2. Ingresar "clave_incorrecta" en Password. 3. Clic en Login.
- **Datos:** standard_user / clave_incorrecta
- **Resultado esperado:** Mensaje "Epic sadface: Username and password do not match any user in this service" y permanece en https://www.saucedemo.com/.

### CP-4.1 · Campo usuario vacío (N, VL: longitud 0)
- **Historia:** SCRUM-4 · Error por campo usuario vacío
- **Precondiciones:** En https://www.saucedemo.com/, sin sesión iniciada.
- **Pasos:** 1. Dejar Username vacío. 2. Ingresar "secret_sauce" en Password. 3. Clic en Login.
- **Datos:** "" / secret_sauce
- **Resultado esperado:** Mensaje "Epic sadface: Username is required" y permanece en https://www.saucedemo.com/.

### CP-5.1 · Campo contraseña vacío (N, VL: longitud 0)
- **Historia:** SCRUM-5 · Error por campo contraseña vacío
- **Precondiciones:** En https://www.saucedemo.com/, sin sesión iniciada.
- **Pasos:** 1. Ingresar "standard_user" en Username. 2. Dejar Password vacío. 3. Clic en Login.
- **Datos:** standard_user / ""
- **Resultado esperado:** Mensaje "Epic sadface: Password is required" y permanece en https://www.saucedemo.com/.

### CP-6.1 · Ambos campos vacíos (N)
- **Historia:** SCRUM-6 · Error por ambos campos vacíos
- **Precondiciones:** En https://www.saucedemo.com/, sin sesión iniciada.
- **Pasos:** 1. Dejar ambos campos vacíos. 2. Clic en Login.
- **Datos:** "" / ""
- **Resultado esperado:** Mensaje "Epic sadface: Username is required" (se valida primero el usuario) y permanece en https://www.saucedemo.com/.

### CP-7.1 · Login con locked_out_user (N)
- **Historia:** SCRUM-7 · Mensaje de cuenta bloqueada
- **Precondiciones:** En https://www.saucedemo.com/, sin sesión iniciada.
- **Pasos:** 1. Ingresar "locked_out_user" en Username. 2. Ingresar "secret_sauce" en Password. 3. Clic en Login.
- **Datos:** locked_out_user / secret_sauce
- **Resultado esperado:** Mensaje "Epic sadface: Sorry, this user has been locked out." y permanece en https://www.saucedemo.com/.

### CP-17.1 · Logout desde el catálogo (P)
- **Historia:** SCRUM-17 · Logout redirige a login
- **Precondiciones:** Sesión iniciada con standard_user / secret_sauce, en /inventory.html.
- **Pasos:** 1. Abrir el menú (botón "Open Menu"). 2. Clic en "Logout". 3. Navegar a https://www.saucedemo.com/inventory.html.
- **Datos:** standard_user / secret_sauce
- **Resultado esperado:** Tras el paso 2 vuelve a https://www.saucedemo.com/ con el botón Login visible. Tras el paso 3 no deja entrar y muestra "Epic sadface: You can only access '/inventory.html' when you are logged in."

### CP-18.1 · Acceso directo por URL sin sesión (N)
- **Historia:** SCRUM-18 · Bloqueo de acceso directo sin login
- **Precondiciones:** Sin sesión iniciada (navegador limpio, sin cookies).
- **Pasos:** 1. Navegar directamente a https://www.saucedemo.com/inventory.html.
- **Datos:** URL /inventory.html
- **Resultado esperado:** Redirige a https://www.saucedemo.com/ y muestra "Epic sadface: You can only access '/inventory.html' when you are logged in."

### CP-146.1 · Usuario con mayúsculas (N)
- **Historia:** SCRUM-146 · Sensibilidad a mayúsculas
- **Precondiciones:** En https://www.saucedemo.com/, sin sesión iniciada.
- **Pasos:** 1. Ingresar "Standard_User" en Username. 2. Ingresar "secret_sauce" en Password. 3. Clic en Login.
- **Datos:** Standard_User / secret_sauce
- **Resultado esperado:** Mensaje "Epic sadface: Username and password do not match any user in this service" y permanece en https://www.saucedemo.com/.

---

## Módulo Carrito

Precondición común: login exitoso con standard_user / secret_sauce y carrito vacío.

### CP-39.1 · Contador con dos productos (P)
- **Historia:** SCRUM-39 · Contador del carrito
- **Pasos:** 1. Clic en "Add to cart" de Sauce Labs Backpack. 2. Clic en "Add to cart" de Sauce Labs Bike Light.
- **Datos:** Sauce Labs Backpack, Sauce Labs Bike Light
- **Resultado esperado:** El contador del carrito muestra 1 tras el paso 1 y 2 tras el paso 2.

### CP-40.1 · Contador al quitar el último producto (VL: 1 → 0)
- **Historia:** SCRUM-40 · Contador oculto con carrito vacío
- **Precondiciones adicionales:** Sauce Labs Backpack en el carrito (contador en 1).
- **Pasos:** 1. Clic en "Remove" de Sauce Labs Backpack en el catálogo.
- **Datos:** Sauce Labs Backpack
- **Resultado esperado:** El contador desaparece del ícono del carrito (no muestra 0).

### CP-61.1 · Seis productos (VL: máximo del catálogo)
- **Historia:** SCRUM-61 · Todos los productos al carrito
- **Pasos:** 1. Clic en "Add to cart" de los 6 productos. 2. Abrir el carrito.
- **Datos:** Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)
- **Resultado esperado:** El contador muestra 6 y el carrito lista los 6 productos, cada uno una vez.

### CP-62.1 · Abrir carrito vacío (VL: 0 productos)
- **Historia:** SCRUM-62 · Estado de carrito vacío
- **Pasos:** 1. Clic en el ícono del carrito.
- **Datos:** Carrito con 0 productos
- **Resultado esperado:** Abre /cart.html sin productos y muestra un mensaje que indica que el carrito está vacío (por ejemplo, "Your cart is empty").

---

## Módulo Checkout

Precondición común: standard_user con Sauce Labs Backpack ($29.99) + Sauce Labs Bike Light ($9.99) en el carrito, en /checkout-step-one.html.

### CP-75.1 · Nombre vacío (N, VL: longitud 0)
- **Historia:** SCRUM-75 · Error por nombre vacío
- **Pasos:** 1. Dejar First Name vacío. 2. Llenar Last Name y Postal Code. 3. Clic en Continue.
- **Datos:** Apellido: Pérez · Código postal: 050001
- **Resultado esperado:** Mensaje "Error: First Name is required" y permanece en /checkout-step-one.html.

### CP-76.1 · Apellido vacío (N, VL: longitud 0)
- **Historia:** SCRUM-76 · Error por apellido vacío
- **Pasos:** 1. Llenar First Name y Postal Code. 2. Dejar Last Name vacío. 3. Clic en Continue.
- **Datos:** Nombre: Ana · Código postal: 050001
- **Resultado esperado:** Mensaje "Error: Last Name is required" y permanece en /checkout-step-one.html.

### CP-77.1 · Código postal vacío (N, VL: longitud 0)
- **Historia:** SCRUM-77 · Error por código postal vacío
- **Pasos:** 1. Llenar First Name y Last Name. 2. Dejar Postal Code vacío. 3. Clic en Continue.
- **Datos:** Nombre: Ana · Apellido: Pérez
- **Resultado esperado:** Mensaje "Error: Postal Code is required" y permanece en /checkout-step-one.html.

### CP-85.1 · Total (P)
- **Historia:** SCRUM-85 · Total final
- **Pasos:** 1. Llenar los datos y clic en Continue. 2. Revisar el resumen en /checkout-step-two.html.
- **Datos:** Nombre: Ana · Apellido: Pérez · Código postal: 050001
- **Resultado esperado:** "Item total: $39.98", "Tax: $3.20" y "Total: $43.18".

### CP-89.1 · Checkout: Complete! (P)
- **Historia:** SCRUM-89 · Pantalla de confirmación
- **Pasos:** 1. Llenar los datos y clic en Continue. 2. Clic en Finish.
- **Datos:** Nombre: Ana · Apellido: Pérez · Código postal: 050001
- **Resultado esperado:** Abre /checkout-complete.html con el título "Checkout: Complete!" y la imagen de confirmación (pony express) visible.

### CP-97.1 · Código postal con letras y símbolos (N)
- **Historia:** SCRUM-97 · Caracteres inválidos en el checkout
- **Pasos:** 1. Llenar First Name y Last Name válidos. 2. Escribir "abc!@#" en Postal Code. 3. Clic en Continue.
- **Datos:** Nombre: Ana · Apellido: Pérez · Código postal: abc!@#
- **Resultado esperado:** Se muestra un mensaje de error en el formulario y permanece en /checkout-step-one.html.
- **Defecto conocido:** SCRUM-365.

---

## Resumen de cobertura

| Tipo | Casos | Cantidad |
|---|---|---|
| Positivos | CP-1.1, CP-17.1, CP-39.1, CP-85.1, CP-89.1 | 5 |
| Negativos | CP-2.1, CP-3.1, CP-4.1, CP-5.1, CP-6.1, CP-7.1, CP-18.1, CP-146.1, CP-75.1, CP-76.1, CP-77.1, CP-97.1 | 12 |
| Valor límite | CP-40.1 (1 → 0), CP-61.1 (6, máximo del catálogo), CP-62.1 (0 productos) | 3 |

Además, CP-4.1, CP-5.1, CP-75.1, CP-76.1 y CP-77.1 prueban el límite inferior de longitud (campo vacío) de cada campo obligatorio.
