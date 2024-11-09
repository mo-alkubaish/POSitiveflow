# POSitiveFlow

## Overview

POSitiveFlow is designed to streamline operations and enhance customer experiences for small to medium-sized businesses. Utilizing modern technologies such as Next.js for responsive frontend and Nest.js for scalable backend services, this system integrates seamlessly with WhatsApp for sending digital receipts and managing customer loyalty programs.

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
•⁠  ⁠Full system access: Manage users, permissions, sales, inventory, and reports.
•⁠  ⁠Customer relations: Track and manage customer loyalty points and rewards.

### Cashiers
•⁠  ⁠Sales processing: Handle transactions, apply discounts, calculate VAT, and send digital receipts via WhatsApp.
•⁠  ⁠Shift management: Perform cash-up and reconciliation at the end of shifts.

### Inventory Managers
•⁠  ⁠Inventory control: Update and manage stock levels, handle supplier information, and generate barcodes.

### Customers
•⁠  ⁠Engagement tools: Receive digital receipts and participate in loyalty programs.

## Project Structure

Below is an overview of the main folders and files in the project:

•⁠  ⁠⁠ /backend ⁠: Contains all the server-side logic using Nest.js.
  - ⁠ /src ⁠: Source files for the backend.
  - ⁠ /test ⁠: Tests for backend functionalities.
  - ⁠ nest-cli.json ⁠: Nest.js CLI configuration.
  - ⁠ Dockerfile ⁠: Docker configuration for backend setup.
•⁠  ⁠⁠ /frontend ⁠: Contains the Next.js frontend application.
  - ⁠ /user/pages ⁠: React components that correspond to web pages.
  - ⁠ /components ⁠: Reusable UI components.
  - ⁠ /public ⁠: Static assets like images and fonts.
  - ⁠ next.config.ts ⁠: Configuration file for Next.js.
•⁠  ⁠⁠ docker-compose.yml ⁠: Docker Compose configuration to run the entire application.

## Prerequisites

Before you begin, ensure you have the following installed:
•⁠  ⁠Node.js (version 18 or above)
•⁠  ⁠Docker (for containerization)
•⁠  ⁠Git (for version control)

## Setup Instructions

To get the project up and running on your local machine, follow these steps:

1.⁠ ⁠*Clone the repository:*

   ```bash
   git clone https://github.com/mo-alkubaish/POSitiveflow
   cd POSitiveflow
   cd frontend
   npm install
   npm run dev
   ```

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests to the develop branch.

## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
•⁠  ⁠Abdullah Al Abbas - 202156190
•⁠  ⁠Osama Alkarnawi - 202183150
•⁠  ⁠Muhannad Alduraywish - 202024100
•⁠  ⁠Mohammed Alshowaikhat - 202178490
•⁠  ⁠Mohammed Alkubaish - 202167510

## Acknowledgments
•⁠  ⁠WhatsApp API for integration features
•⁠  ⁠Nest.js backend framework
•⁠  ⁠Next.js frontend framework


