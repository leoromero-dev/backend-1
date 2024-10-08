## Documentación de Endpoints

### Productos

#### 1. Obtener la lista de productos

- **Método HTTP:** GET
- **Ruta:** `/api/products`
- **Descripción:** Este endpoint devuelve una lista de todos los productos disponibles.
- **Parámetros:** Ninguno
- **Respuesta exitosa:**
  - **Código de estado:** 200 OK
  - **Contenido:** 
    ```json
    {
      "products": [
        {
            "id": 1,
            "title": "Crotón",
            "description": "Planta de interior",
            "code": "P1",
            "price": 9.99,
            "status": true,
            "stock": 2,
            "category": "Jardín",
            "thumbnail": "https://www.imagen/croton"
        },
        {
            "id": 2,
            "title": "Potus",
            "description": "Planta de interior",
            "code": "P2",
            "price": 9.99,
            "status": true,
            "stock": 5,
            "category": "Jardín",
            "thumbnail": "https://www.imagen/potus"
        },
      ]
    }
    ```


#### 2. Obtener un producto por ID

- **Método HTTP:** GET
- **Ruta:** `/api/products/:pid`
- **Descripción:** Este endpoint devuelve los detalles de un producto específico basado en su ID.
- **Parámetros:**
  - **pid (en ruta):** ID del producto. Debe ser un número entero.
- **Respuesta exitosa:**
  - **Código de estado:** 200 OK
  - **Contenido:** 
    ```json
    {
        "id": 1,
        "title": "Crotón",
        "description": "Planta de interior",
        "code": "P1",
        "price": 9.99,
        "status": true,
        "stock": 2,
        "category": "Jardín",
        "thumbnail": "https://www.imagen/croton"
    }
    ```
- **Respuestas de error:**
  - Si falta el ID del producto:
    - **Código de estado:** 400 Bad Request
    - **Contenido:** `{"message": "Falta el ID"}`
  - Si el producto no se encuentra:
    - **Código de estado:** 404 Not Found
    - **Contenido:** `{"message": "Producto no encontrado"}`


#### 3. Crear un nuevo producto

- **Método HTTP:** POST
- **Ruta:** `/api/products`
- **Descripción:** Este endpoint permite crear un nuevo producto.
- **Parámetros (cuerpo de la solicitud):**
  - **title (string):** Nombre del producto.
  - **description (string):** Descripción del producto.
  - **code (string):** Código del producto.
  - **price (number):** Precio del producto.
  - **status (bool):** Estado del producto.
  - **stock (number):** Cantidades disponibles del producto.
  - **category (string):** Categoria del producto.
  - **thumbnail (string):** Link a la imagen del producto (opcional).
- **Respuesta exitosa:**
  - **Código de estado:** 201 Created
    - **Contenido:** 
    ```json
    {
      "message": "Producto creado"
    }
    ```
- **Respuestas de error:**
  - Si falta alguno de los datos del producto:
    - **Código de estado:** 400 Bad Request
    - **Contenido:** `{"message": "Faltan datos"}`
   
      
#### 4. Actualizar un producto

- **Método HTTP:** PUT
- **Ruta:** `/api/products/:pid`
- **Descripción:** Este endpoint actualiza los detalles de un producto existente.
- **Parámetros:**
  - **pid (en ruta):** ID del producto a actualizar.
  - **Cuerpo de la solicitud:** Datos del producto a actualizar (title, description, price, etc.).
- **Respuesta exitosa:**
  - **Código de estado:** 200 OK
  - **Contenido:** 
    ```json
    {
      "message": "Producto actualizado"
    }
    ```
- **Respuestas de error:**
  - Si falta el ID o no existe un producto con ese ID:
    - **Código de estado:** 400 Bad Request
    - **Contenido:** `{"message": "Ingrese un ID válido"}`
   
      
#### 5. Eliminar un producto

- **Método HTTP:** DELETE
- **Ruta:** `/api/products/:pid`
- **Descripción:** Este endpoint elimina un producto basado en su ID.
- **Parámetros:**
  - **pid (en ruta):** ID del producto a eliminar.
- **Respuesta exitosa:**
  - **Código de estado:** 200 OK
  - **Contenido:** 
    ```json
    {
      "message": "Producto eliminado"
    }
    ```
- **Respuestas de error:**
  - Si falta el ID o no existe un producto con ese ID:
    - **Código de estado:** 400 Bad Request
    - **Contenido:** `{"message": "Ingrese un ID válido"}`
   
### Carritos

#### 1. Crear un nuevo carrito

- **Método HTTP:** POST
- **Ruta:** `/api/carts`
- **Descripción:** Este endpoint crea un nuevo carrito y devuelve un mensaje de éxito.
- **Parámetros:** Ninguno
- **Cuerpo de la solicitud:** No se requiere.
- **Respuesta exitosa:**
  - **Código de estado:** 200 OK
  - **Contenido:** 
    ```json
    {
      "message": "Carrito creado"
    }
    ```

#### 2. Obtener un carrito por su ID

- **Método HTTP:** GET
- **Ruta:** `/api/carts/:cid`
- **Descripción:** Este endpoint devuelve los detalles de un carrito específico basado en su ID.
- **Parámetros:**
  - **cid (en ruta):** ID del carrito. Debe ser un número entero.
- **Respuesta exitosa:**
  - **Código de estado:** 200 OK
  - **Contenido:** 
    ```json
    {
      "products": [
        {
          "id": 1,
          "quantity": 2
        },
        {
          "id": 2,
          "quantity": 1
        }
      ]
    }
    ```
- **Respuestas de error:**
  - Si falta el ID del carrito:
    - **Código de estado:** 400 Bad Request
    - **Contenido:** `{"message": "Falta el ID"}`
  - Si el carrito no se encuentra:
    - **Código de estado:** 404 Not Found
    - **Contenido:** `{"message": "Carrito no encontrado"}`

#### 3. Agregar un producto a un carrito

- **Método HTTP:** POST
- **Ruta:** `/api/carts/:cid/product/:pid`
- **Descripción:** Este endpoint agrega un producto específico a un carrito basado en sus IDs.
- **Parámetros:**
  - **cid (en ruta):** ID del carrito. Debe ser un número entero.
  - **pid (en ruta):** ID del producto a agregar. Debe ser un número entero.
- **Respuesta exitosa:**
  - **Código de estado:** 200 OK
  - **Contenido:** 
    ```json
    {
      "message": "Producto agregado al carrito"
    }
    ```
- **Respuestas de error:**
  - Si falta el ID del carrito o del producto:
    - **Código de estado:** 400 Bad Request
    - **Contenido:** `{"message": "Falta un ID"}`
  - Si el carrito no se encuentra:
    - **Código de estado:** 404 Not Found
    - **Contenido:** `{"message": "Carrito no encontrado"}`
