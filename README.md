# Automatización de pruebas · Swag Labs

Automatización de 20 casos del plan de pruebas de **Swag Labs** (https://www.saucedemo.com) con **Playwright + TypeScript**.
Opción B de la entrega: casos de los módulos **Login**, **Carrito** y **Checkout**, con casos positivos, negativos y de valor límite.

**Autor:** Nicolás Giraldo Chica

## Requisitos

- **Node.js 20 o superior.** Compruébalo con `node -v` (descarga la versión LTS en https://nodejs.org).
- **Git.** Compruébalo con `git --version`.
- Conexión a internet: las pruebas corren contra https://www.saucedemo.com.
- Unos 600 MB libres para el navegador de pruebas.

## Instalar desde cero

```bash
git clone https://github.com/NicolasDev256/swaglabs-automatizacion.git
cd swaglabs-automatizacion
npm ci
npx playwright install chromium
```

> En Windows, si PowerShell dice que "la ejecución de scripts está deshabilitada", usa la terminal **Git Bash** o **cmd**, o ejecuta una vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## Ejecutar las pruebas

| Qué | Comando |
|---|---|
| Toda la suite | `npx playwright test` |
| Viendo el navegador | `npx playwright test --headed` |
| Un solo caso, por su ID | `npx playwright test -g "CP-62.1"` |
| Un módulo | `npx playwright test login` (o `carrito`, `checkout`) |
| Abrir el reporte HTML | `npx playwright show-report` (se cierra con Ctrl + C) |

Resultado esperado: **20 passed**. Dos pruebas aparecen con una **x** porque detectan defectos conocidos del sistema (SCRUM-361 y SCRUM-365). Están marcadas con `test.fail(...)`, así que su fallo es el esperado y cuentan como *passed*.

## Estructura

```
data/datos.ts            Datos de prueba (usuarios, claves, mensajes, productos, cliente), separados del código
pages/                   Page Object Model: un archivo por pantalla
  LoginPage.ts
  InventarioPage.ts
  CarritoPage.ts
  CheckoutPage.ts
tests/                   Un archivo por módulo. Cada prueba lleva el ID del caso: "CP-3.1 Contraseña incorrecta"
  login.spec.ts          10 casos
  carrito.spec.ts        4 casos
  checkout.spec.ts       6 casos
docs/
  plan-corregido.md        Plan de pruebas corregido (los 20 casos)
  tabla-cambios.md         Qué se corrigió, en qué caso y por qué
  matriz-trazabilidad.md   Caso → historia → script → resultado
  reporte-defectos.md      Defectos encontrados (SCRUM-361 y SCRUM-365)
evidencia/
  reporte-html/            Reporte HTML de una ejecución completa (abrir con npx playwright show-report evidencia/reporte-html; incluye video de cada prueba)
  capturas/                Captura de la pantalla final de cada prueba (CP-x.y.png)
  salida-terminal.txt      Salida de la terminal de una ejecución completa
.github/workflows/         La suite corre sola en GitHub Actions en cada push
```

## Decisiones técnicas

- **Selectores estables:** Swag Labs trae atributos `data-test` en sus elementos. Se configuró `testIdAttribute: 'data-test'` y se usa `getByTestId(...)`, o `getByRole` para los botones.
- **Sin esperas fijas:** no hay `waitForTimeout` ni `sleep`. Las aserciones de Playwright (`expect(...)`) reintentan solas hasta 5 segundos.
- **Independencia:** cada prueba arranca con un navegador limpio (sin cookies ni carrito) y hace su propio login en `beforeEach`. Cualquier prueba se puede correr sola con `-g "CP-x.y"`.
- **Datos separados:** todos los valores de los casos están en `data/datos.ts`. Las pruebas no tienen datos escritos a mano.
- **Reporte y evidencia:** cada ejecución genera el reporte HTML con captura y video de cada prueba, y trace de las que fallan.

## Integración continua

En cada `git push`, GitHub Actions instala todo en una máquina limpia (Ubuntu) y ejecuta la suite. El reporte se puede descargar como artefacto `reporte-playwright` desde la pestaña **Actions**.
