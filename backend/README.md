# POSitiveFlow Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

POSitiveFlow backend is built using [Nest](https://github.com/nestjs/nest) framework, a progressive Node.js framework for building efficient and scalable server-side applications. This backend serves as the API for the POSitiveFlow Point of Sale system.

## Project setup

```bash
$ npm install
```

## Database Configuration

The project uses MikroORM for database operations. The configuration can be found in `src/mikro-orm.config.ts`. Make sure to set up your database and update the configuration file with your database credentials.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

The POSitiveFlow API is organized around REST principles. It accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes and authentication.

### Authentication

The API uses JWT (JSON Web Tokens) for authentication.

#### Endpoints

`POST /api/auth/login` - Authenticate a user and get a token
- Request Body: `{ "email": "user@example.com", "password": "password" }` OR `{ "phone": "+1234567890", "password": "password" }`
- Response: `{ "access_token": "eyJhbGciOiJIUzI1NiIsInR..." }`

`POST /api/auth/logout` - Logout and invalidate token
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: `{ "message": "Logout successful" }`

### Users

User management endpoints.

#### Endpoints

`GET /api/users` - List all users (Admin only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: Array of user objects

`GET /api/users/:id` - Get a specific user
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: User object

`POST /api/users` - Create a new user (Admin only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: User object
- Response: Created user object

`PATCH /api/users/:id` - Update a user (Admin or own account)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: Partial user object
- Response: Updated user object

`DELETE /api/users/:id` - Delete a user (Admin only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: `{ "message": "User deleted" }`

### Items (Products)

Inventory management endpoints.

#### Endpoints

`GET /api/items` - List all items
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Query Parameters: `page`, `limit`, `search`, `category`
- Response: Array of item objects

`GET /api/items/:id` - Get a specific item
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: Item object

`POST /api/items` - Create a new item (Admin/Inventory Manager only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: Item object
- Response: Created item object

`PATCH /api/items/:id` - Update an item (Admin/Inventory Manager only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: Partial item object
- Response: Updated item object

`DELETE /api/items/:id` - Delete an item (Admin/Inventory Manager only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: `{ "message": "Item deleted" }`

### Cart

Shopping cart management endpoints.

#### Endpoints

`GET /api/cart` - Get current user's cart
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: Cart object with items

`POST /api/cart/items` - Add item to cart
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: `{ "itemId": "123", "quantity": 2 }`
- Response: Updated cart object

`PATCH /api/cart/items/:itemId` - Update cart item
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: `{ "quantity": 3 }`
- Response: Updated cart object

`DELETE /api/cart/items/:itemId` - Remove item from cart
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: Updated cart object

`POST /api/cart/checkout` - Checkout cart
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: Checkout details
- Response: Order confirmation

### Suppliers

Supplier management endpoints.

#### Endpoints

`GET /api/suppliers` - List all suppliers
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: Array of supplier objects

`GET /api/suppliers/:id` - Get a specific supplier
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: Supplier object

`POST /api/suppliers` - Create a new supplier (Admin/Inventory Manager only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: Supplier object
- Response: Created supplier object

`PATCH /api/suppliers/:id` - Update a supplier (Admin/Inventory Manager only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: Partial supplier object
- Response: Updated supplier object

`DELETE /api/suppliers/:id` - Delete a supplier (Admin/Inventory Manager only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: `{ "message": "Supplier deleted" }`

### Discounts

Discount management endpoints.

#### Endpoints

`GET /api/discount` - List all discounts
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: Array of discount objects

`GET /api/discount/:id` - Get a specific discount
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: Discount object

`POST /api/discount` - Create a new discount (Admin only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: Discount object
- Response: Created discount object

`PATCH /api/discount/:id` - Update a discount (Admin only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Request Body: Partial discount object
- Response: Updated discount object

`DELETE /api/discount/:id` - Delete a discount (Admin only)
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Response: `{ "message": "Discount deleted" }`

## Project Structure

The backend code is organized using Nest.js module structure:

- **/src**: Main source directory
  - **/auth**: Authentication module
  - **/common**: Shared functionality
    - **/cart**: Cart module
    - **/discount**: Discount management
    - **/items**: Product management
  - **/users**: User management
  - **/suppliers**: Supplier management
  - **/settings**: System settings
  - **/feedback**: Customer feedback
  - **/exception-filters**: Error handling
  - **/middlewares**: HTTP request middlewares

## Error Handling

The API returns standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Unprocessable Entity
- 500: Server Error

Error responses include a message field with details about the error.

## Deployment

When you're ready to deploy the POSitiveFlow backend to production, you can use the included Dockerfile:

```bash
# Build the Docker image
docker build -t positiveflow-backend .

# Run the container
docker run -p 3001:3001 positiveflow-backend
```

Alternatively, use Docker Compose from the project root directory:

```bash
docker-compose up -d
```

## Support

For support or questions about the POSitiveFlow backend, please contact the development team listed in the main README.

## License

POSitiveFlow is [MIT licensed](LICENSE).