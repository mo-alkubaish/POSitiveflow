# POSitiveFlow

## Overview

POSitiveFlow is a comprehensive Point of Sale system designed to streamline operations and enhance customer experiences for small to medium-sized businesses. Utilizing modern technologies such as Next.js for responsive frontend and Nest.js for scalable backend services, this system integrates seamlessly with WhatsApp for sending digital receipts and managing customer loyalty programs.

## Dummy User Accounts

To facilitate testing and demonstration for the log in button, the following dummy user accounts are pre-configured:

- **Lionel Messi** (Cashier)
  - Email: messi@icloud.com
  - Password: 1234
  - Phone: (966) 555-0222

- **Cristiano Ronaldo** (Store Owner)
  - Email: ronaldo@icloud.com
  - Password: 1234
  - Phone: (966) 555-0333

- **Kylian Mbappé** (Inventory Manager)
  - Email: mbappe@icloud.com
  - Password: 1234
  - Phone: (966) 555-0444

- **Jude Bellingham** (Customer)
  - Email: bellingham@icloud.com
  - Password: 1234
  - Phone: (966) 555-0555

## Features

### Store Owners/Managers
- Full system access: Manage users, permissions, sales, inventory, and reports.
- Customer relations: Track and manage customer loyalty points and rewards.
- Dashboard analytics: View sales summaries, revenue trends, and inventory status.
- System settings: Configure business details, backup data, and set user permissions.

### Cashiers
- Sales processing: Handle transactions, apply discounts, calculate VAT, and send digital receipts via WhatsApp.
- Shift management: Perform cash-up and reconciliation at the end of shifts.
- Customer lookup: Access customer profiles for loyalty points and purchase history.

### Inventory Managers
- Inventory control: Update and manage stock levels, handle supplier information, and generate barcodes.
- Product management: Add, edit, and categorize products with images and pricing details.
- Supplier management: Maintain vendor information and procurement records.

### Customers
- Engagement tools: Receive digital receipts and participate in loyalty programs.
- Order history: View past purchases and receipts.
- Feedback system: Provide ratings and comments on products and services.

## Project Structure

Below is an overview of the main folders and files in the project:

- **/backend**: Contains all the server-side logic using Nest.js.
  - **/src**: Source files for the backend.
    - **/auth**: Authentication services and JWT implementation.
    - **/common**: Common modules for cart, discount, and inventory management.
    - **/users**: User management and role-based access control.
  - **/test**: Tests for backend functionalities.
  - **nest-cli.json**: Nest.js CLI configuration.
  - **Dockerfile**: Docker configuration for backend setup.

- **/frontend**: Contains the Next.js frontend application.
  - **/app**: Next.js app directory structure with page components.
    - **/admin**: Admin dashboard and management interfaces.
    - **/cashier**: Point of sale interface for cashiers.
    - **/customer**: Customer-facing interfaces and loyalty features.
    - **/inventory**: Inventory management screens.
  - **/components**: Reusable UI components.
  - **/public**: Static assets like images and fonts.
  - **next.config.ts**: Configuration file for Next.js.

- **docker-compose.yml**: Docker Compose configuration to run the entire application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or above)
- Docker (for containerization)
- Git (for version control)
- npm (version 8 or above)

## Setup Instructions

To get the project up and running on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mo-alkubaish/POSitiveflow
   cd POSitiveflow
   ```

2. **Set up the frontend:**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   The frontend will be available at http://localhost:3000

3. **Set up the backend:**

   ```bash
   cd ../backend
   npm install
   npm run start:dev
   ```

   The backend API will be available at http://localhost:3001

4. **Using Docker Compose (optional):**

   From the root directory:

   ```bash
   docker-compose up -d
   ```

   This will start both frontend and backend services in Docker containers.

## API Documentation

The backend API is built with Nest.js and provides the following main endpoints:

- `/api/auth`: Authentication endpoints for login and token management
- `/api/users`: User management endpoints
- `/api/items`: Product and inventory management
- `/api/cart`: Shopping cart operations
- `/api/suppliers`: Supplier management

For detailed API documentation, start the backend server and navigate to:
- http://localhost:3001/api-docs

## Troubleshooting

### Common Issues

1. **Frontend connection errors:**
   - Ensure the backend server is running
   - Check that environment variables are properly configured
   - Verify network connectivity between services

2. **Database connection issues:**
   - Check database credentials
   - Ensure the database server is running
   - Verify network connectivity to the database

3. **Docker issues:**
   - Ensure Docker and Docker Compose are installed correctly
   - Check container logs: `docker-compose logs`
   - Verify port availability: `netstat -tuln`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request to the develop branch

Please ensure your code follows our coding standards and includes appropriate tests.

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

- Abdullah Al Abbas - 202156190
- Osama Alkarnawi - 202183150
- Muhannad Alduraywish - 202024100
- Mohammed Alshowaikhat - 202178490
- Mohammed Alkubaish - 202167510

## Acknowledgments

- WhatsApp API for integration features
- Nest.js backend framework
- Next.js frontend framework
- Tailwind CSS for styling
- Google Gemini API for AI integration