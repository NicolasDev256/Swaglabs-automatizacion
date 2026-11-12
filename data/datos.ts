/**
 * DATOS DE PRUEBA
 * Son los mismos valores que aparecen en los casos de prueba del plan (Jira, proyecto SCRUM).
 * Si cambia un dato del caso, se cambia aqui y no en las pruebas.
 */

export const CLAVE = 'secret_sauce';

export const USUARIOS = {
  estandar: 'standard_user',
  bloqueado: 'locked_out_user',
  inexistente: 'usuario_invalido', // CP-2.1
  conMayusculas: 'Standard_User', // CP-146.1
};

export const CLAVE_INCORRECTA = 'clave_incorrecta'; // CP-3.1

export const MENSAJES = {
  noCoincide: 'Epic sadface: Username and password do not match any user in this service',
  usuarioRequerido: 'Epic sadface: Username is required',
  claveRequerida: 'Epic sadface: Password is required',
  bloqueado: 'Epic sadface: Sorry, this user has been locked out.',
  sinSesion: "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  nombreRequerido: 'Error: First Name is required',
  apellidoRequerido: 'Error: Last Name is required',
  postalRequerido: 'Error: Postal Code is required',
};

export const PRODUCTOS = {
  mochila: 'Sauce Labs Backpack',
  luz: 'Sauce Labs Bike Light',
  todos: [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ],
};

// datos del formulario de checkout (CP-75.1 a CP-97.1)
export const CLIENTE = {
  nombre: 'Ana',
  apellido: 'Pérez',
  postal: '050001',
  postalInvalido: 'abc!@#', // CP-97.1
};

// valores esperados del resumen con mochila ($29.99) + luz ($9.99) (CP-85.1)
export const RESUMEN = {
  subtotal: 'Item total: $39.98',
  impuesto: 'Tax: $3.20',
  total: 'Total: $43.18',
};
