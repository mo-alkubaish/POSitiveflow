# POSitiveFlow Frontend

This is the frontend application for the POSitiveFlow Point of Sale system, built with [Next.js](https://nextjs.org) and utilizing the App Router architecture.

## Overview

The POSitiveFlow frontend provides a responsive and intuitive user interface for multiple user roles:
- Store owners/managers
- Cashiers
- Inventory managers
- Customers

The application features a modern UI with Tailwind CSS, responsive design for all device sizes, and integrates with the POSitiveFlow backend API.

## Key Features

- **Role-based interfaces**: Different UI experiences based on user roles
- **Point of Sale system**: Real-time cart management and checkout process
- **Admin dashboard**: Sales analytics, user management, and system settings
- **Inventory management**: Product and supplier management
- **Customer portal**: Order history and loyalty program

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

### App Router Structure

The application follows Next.js App Router architecture:

- `/app` - Main application directory
  - `/admin` - Admin-specific pages and components
  - `/cashier` - Point of Sale interface
  - `/customer` - Customer-facing pages
  - `/inventory` - Inventory management interface
  - `/landingPage` - Marketing pages and authentication
  - `/api` - API routes for client-side operations

### Key Components

- `/components/ui` - Reusable UI components
- `/lib` - Utility functions and helpers
- `/public` - Static assets

## Component Documentation

### Core UI Components

#### Button Component

Located at `/components/ui/button.tsx`, this is a customizable button component with various states and styles.

Usage:
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="md" onClick={handleClick}>
  Click Me
</Button>
```

#### Card Component

Located at `/components/ui/card.tsx`, provides a container with optional header, footer, and content sections.

Usage:
```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

#### Table Component

Located at `/components/ui/table.tsx`, provides a responsive data table with sorting and pagination capabilities.

Usage:
```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Header 1</TableCell>
      <TableCell>Header 2</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell>Data 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Business Components

#### CheckoutPage Component

Located at `/components/CheckoutPage.tsx`, handles the checkout process including payment processing.

#### Navbar Component

Located at `/components/Navbar.tsx`, provides navigation based on user role.

#### DateRangePicker Component

Located at `/components/DateRangePicker.tsx`, allows selecting date ranges for reports and filters.

### Page Components

#### Dashboard Page

Located at `/app/admin/dashboard/page.tsx`, provides sales analytics and business insights.

#### Inventory Management

Located at `/app/inventory/page.tsx`, manages products and stock levels.

#### Point of Sale

Located at `/app/cashier/items/page.tsx`, handles product selection and cart management.

## State Management

POSitiveFlow uses React Context for state management in key areas:

- DiscountContext - Manages discount application at checkout
- Cart state management - Handles product selection and quantity

## API Integration

The frontend communicates with the backend API using fetch or axios. API endpoints are defined in the backend documentation.

## Styling

The application uses:
- Tailwind CSS for utility-based styling
- CSS Modules for component-specific styles
- Custom animations for interactive elements

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This generates an optimized version of the application for production deployment.

## Deployment

The easiest way to deploy the Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js, or deploy to any platform supporting Node.js applications.

For Docker-based deployment, use the included Dockerfile:

```bash
# Build the Docker image
docker build -t positiveflow-frontend .

# Run the container
docker run -p 3000:3000 positiveflow-frontend
```

Alternatively, use Docker Compose from the project root directory:

```bash
docker-compose up -d
```

## Contributing

Please refer to the main project README for contribution guidelines.

## License

POSitiveFlow is MIT licensed.