# BALL*MART - a fake sporting goods store
## MET CS 602 Summer2 2022 term project using express.js and mongoDB. Styled with Bulma.


### Usage
First export the following environment variables:
```
export CS602_TERM_PROJ_DB_HOST=(mongo url)
export CS602_TERM_PROJ_DB_USER=(db user)
export CS602_TERM_PROJ_DB_SECRET=(db pass)
export CS602_TERM_PROJ_DB=(db name)
export CS602_TERM_PROJ_JWT_SECRET=(any string)

```
then install dependencies and start the server:
```
npm install
npm start
```
visit the site at http://localhost:3000

### Public REST API

- GET /store --> List products. Query params include maxPrice, minPrice, and desc. Returns XML or JSON depending upon requestor.

### Public routes
- GET /store --> Displays the main storefront and its products.  Accepts query params maxPrice, minPrice, and desc.
- GET /login --> Brings one to the login form.
- POST /login --> Submits the login form.  On success, a JWT will be set in a signed cookie.
- GET /logout --> Logs out the user by deleting the JWT cookie.
- GET /register --> A form for a new user to create their account.
- POST /register --> Create the new account from the form. Password is hashed via bcrypt.

### Auththenticated customer routes
- GET /orders --> Manage order history.
- POST /buy --> Go to purchase confirmation screen.
- POST /reallybuy --> Purchase item.

### Administrator-only routes
- GET /manageorders --> Display all customer orders.
- GET /manageorders/edit/:id --> Edit selected customer order.
- POST /manageorders/edit --> Saves editted customer order to DB.
- GET /manageorders/delete/:id --> Delete selected customer order.
- POST /manageorders/delete --> Remove customer order from DB.

- GET /products --> Manage the product catalog.
- GET /products/add --> Manage the product catalog.
- POST /products/add --> Manage the product catalog.
- GET /products/edit/:id --> Manage the product catalog.
- POST /products/edit --> Manage the product catalog.
- GET /products/delete/:id --> Manage the product catalog.
- POST /products/delete --> Manage the product catalog.

- GET /users --> Manage user accounts.
- GET /users/edit/:id --> Manage user accounts.
- POST /users/edit --> Manage user accounts.
- GET /users/delete/:id --> Manage user accounts.
- POST /users/delete --> Manage user accounts.

### Middleware
- checkToken --> Checks for presence of token so as to determine logged in state.  Token encodes username and isAdmin flag.
- customerOnly --> Allows logged in users to proceed to route. Redirects to login if not.
- employeeOnly --> Allows admins to proceed to management routes. Falls back to 404 if not an admin.
