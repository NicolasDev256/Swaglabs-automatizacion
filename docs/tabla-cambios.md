# Tabla de cambios del plan de pruebas

Cambios hechos a los casos de la entrega de mitad de semestre antes de automatizarlos.

> **Nota:** no tuve a la mano la retroalimentación escrita de la entrega de mitad de semestre. Por eso las correcciones siguen los criterios que pide esta entrega: cada caso necesita **datos concretos** y un **resultado esperado verificable** (mensaje exacto, URL o estado de la pantalla). Si la retroalimentación pide algo más, se agrega aquí.

| # | Caso | Qué se corrigió | Por qué |
|---|---|---|---|
| 1 | CP-62.1 | Resultado esperado: de "Se muestra un mensaje o estado que indica que el carrito está vacío" a "Abre /cart.html sin productos y muestra un mensaje que indica que el carrito está vacío (por ejemplo, 'Your cart is empty')". | "Un mensaje o estado" no se puede verificar: cualquier pantalla lo cumpliría. Ahora dice qué se comprueba (0 productos y un texto de carrito vacío). |
| 2 | CP-97.1 | Resultado esperado: de "Se rechaza el código postal con un mensaje de error y no avanza" a "Se muestra un mensaje de error en el formulario y permanece en /checkout-step-one.html". Se agregó el defecto SCRUM-365, que en "Resultado obtenido" decía "Bug:" sin clave. | "No avanza" se cambió por la URL concreta. El campo del bug estaba vacío y se perdía la trazabilidad con el defecto. |
| 3 | CP-18.1 | Resultado esperado: de "un mensaje de error tipo 'Epic sadface: …'" al mensaje exacto "Epic sadface: You can only access '/inventory.html' when you are logged in." | "Tipo" deja el resultado abierto. Una prueba necesita el texto exacto. |
| 4 | CP-146.1 | Resultado esperado: de "Se rechaza con 'Username and password do not match…'" al mensaje completo con el prefijo "Epic sadface:" y "permanece en https://www.saucedemo.com/". | El mensaje estaba incompleto y no decía en qué pantalla queda el usuario. |
| 5 | CP-17.1 | Se agregó el paso 3 (volver a /inventory.html) y su resultado esperado. | "Sin sesión activa" no se ve en pantalla. Para comprobarlo hay que intentar entrar al catálogo y ver el mensaje de bloqueo. |
| 6 | CP-89.1 | Resultado esperado: se agregó la URL /checkout-complete.html y se nombró la imagen de confirmación (pony express). | "Con la imagen de confirmación" no decía cuál imagen. |
| 7 | CP-85.1 | Resultado esperado: de "Total: $43.18 (39.98 + 3.20)" a los tres valores con su etiqueta: "Item total: $39.98", "Tax: $3.20" y "Total: $43.18". | El subtotal y el impuesto estaban solo como cuenta entre paréntesis. Ahora cada valor se puede comprobar en su fila. |
| 8 | CP-39.1, CP-40.1, CP-61.1, CP-62.1 | Datos de entrada: de "standard_user / secret_sauce" a los productos que usa el caso. El usuario pasó a la precondición común del módulo. | Los datos del caso son los productos. El usuario es parte de la precondición. |
| 9 | CP-61.1 | Se escribieron los nombres de los 6 productos y se agregó "cada uno una vez" al resultado esperado. | "Los 6 productos" no decía cuáles. Así se detecta también un producto repetido. |
| 10 | CP-2.1 a CP-7.1 | Precondición: de "En la página de login" a la URL https://www.saucedemo.com/. Resultado esperado: de "permanece en login" a "permanece en https://www.saucedemo.com/". | Una URL concreta se puede comprobar; "la página de login" no. |
| 11 | Los 20 casos | Se agregó el tipo de caso (positivo, negativo o valor límite) y la historia de la que sale cada caso. | La entrega pide casos positivos, negativos y de valor límite, y trazabilidad con las historias. |
| 12 | Los 20 casos | Resultado obtenido: de "Pendiente de ejecución" al resultado de la ejecución automatizada (ver matriz de trazabilidad). | Ya se ejecutaron. |
