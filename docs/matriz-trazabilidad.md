# Matriz de trazabilidad

Resultado de la ejecución del 11/11/2026 en Chromium (local y GitHub Actions).

- **Aprobada:** el sistema cumple el resultado esperado.
- **Fallida (defecto):** el sistema no cumple el resultado esperado. La prueba está marcada con `test.fail(...)` y la clave del defecto, así que en el reporte cuenta como fallo esperado.

| ID del caso | Escenario / criterio de aceptación | Archivo › nombre del script | Tipo | Resultado |
|---|---|---|---|---|
| CP-1.1 | SCRUM-1 · Iniciar sesión con standard_user | tests/login.spec.ts › CP-1.1 Login exitoso con standard_user | Positivo | Aprobada |
| CP-2.1 | SCRUM-2 · Error por usuario inexistente | tests/login.spec.ts › CP-2.1 Usuario inexistente | Negativo | Aprobada |
| CP-3.1 | SCRUM-3 · Error por contraseña incorrecta | tests/login.spec.ts › CP-3.1 Contraseña incorrecta | Negativo | Aprobada |
| CP-4.1 | SCRUM-4 · Error por campo usuario vacío | tests/login.spec.ts › CP-4.1 Campo usuario vacío | Negativo | Aprobada |
| CP-5.1 | SCRUM-5 · Error por campo contraseña vacío | tests/login.spec.ts › CP-5.1 Campo contraseña vacío | Negativo | Aprobada |
| CP-6.1 | SCRUM-6 · Error por ambos campos vacíos | tests/login.spec.ts › CP-6.1 Ambos campos vacíos | Negativo | Aprobada |
| CP-7.1 | SCRUM-7 · Mensaje de cuenta bloqueada | tests/login.spec.ts › CP-7.1 Login con locked_out_user | Negativo | Aprobada |
| CP-17.1 | SCRUM-17 · Logout redirige a login | tests/login.spec.ts › CP-17.1 Logout desde el catálogo | Positivo | Aprobada |
| CP-18.1 | SCRUM-18 · Bloqueo de acceso directo sin login | tests/login.spec.ts › CP-18.1 Acceso directo por URL sin sesión | Negativo | Aprobada |
| CP-146.1 | SCRUM-146 · Sensibilidad a mayúsculas | tests/login.spec.ts › CP-146.1 Usuario con mayúsculas | Negativo | Aprobada |
| CP-39.1 | SCRUM-39 · Contador del carrito | tests/carrito.spec.ts › CP-39.1 Contador con dos productos | Positivo | Aprobada |
| CP-40.1 | SCRUM-40 · Contador oculto con carrito vacío | tests/carrito.spec.ts › CP-40.1 Contador al quitar el último producto (valor límite 1 → 0) | Valor límite | Aprobada |
| CP-61.1 | SCRUM-61 · Todos los productos al carrito | tests/carrito.spec.ts › CP-61.1 Seis productos (valor límite: todo el catálogo) | Valor límite | Aprobada |
| CP-62.1 | SCRUM-62 · Estado de carrito vacío | tests/carrito.spec.ts › CP-62.1 Abrir carrito vacío (valor límite 0 productos) | Valor límite | **Fallida (defecto SCRUM-361)** |
| CP-75.1 | SCRUM-75 · Error por nombre vacío | tests/checkout.spec.ts › CP-75.1 Nombre vacío | Negativo | Aprobada |
| CP-76.1 | SCRUM-76 · Error por apellido vacío | tests/checkout.spec.ts › CP-76.1 Apellido vacío | Negativo | Aprobada |
| CP-77.1 | SCRUM-77 · Error por código postal vacío | tests/checkout.spec.ts › CP-77.1 Código postal vacío | Negativo | Aprobada |
| CP-85.1 | SCRUM-85 · Total final | tests/checkout.spec.ts › CP-85.1 Total | Positivo | Aprobada |
| CP-89.1 | SCRUM-89 · Pantalla de confirmación | tests/checkout.spec.ts › CP-89.1 Checkout: Complete! | Positivo | Aprobada |
| CP-97.1 | SCRUM-97 · Caracteres inválidos en el checkout | tests/checkout.spec.ts › CP-97.1 Código postal con letras y símbolos | Negativo | **Fallida (defecto SCRUM-365)** |

**Totales:** 20 casos automatizados · 18 aprobados · 2 fallidos por defectos del sistema (SCRUM-361 y SCRUM-365).
