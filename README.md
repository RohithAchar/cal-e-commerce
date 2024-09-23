# E-commerce Admin Application

This is a full-stack **E-commerce Admin Dashboard** that allows users to create and manage multiple stores and products. Admins can monitor sales, manage store settings, and handle products efficiently. The application is built with modern technologies and features a clean UI for seamless interactions.

## Features

- **Create and manage multiple stores**: Admins can create multiple stores and switch between them.
- **Product management**: Add, update, and delete products within stores.
- **Sales monitoring**: View and monitor sales data for each store.
- **Store management**: Update store details and manage store operations.
- **Authentication**: Secure login using Clerk for user authentication.
- **Payment integration**: Stripe integration for handling payments.

## Tech Stack

- **Next.js**: React framework for server-side rendering and full-stack development.
- **Prisma ORM**: Database ORM for PostgreSQL, used to manage data and relationships.
- **Zustand**: A small, fast state management library to handle the application state.
- **ShadCn**: A UI component library for a modern, responsive design.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **Clerk**: Authentication and user management.
- **Stripe**: Payment processing integration for managing transactions.
- **PostgreSQL**: Relational database for storing store and product data.

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **PostgreSQL** (latest version)
- **Stripe account** for payment integration
- **Clerk account** for authentication setup

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RohithAchar/e-commerce-admin.git
   cd e-commerce-admin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   FRONTEND_STORE_URL=your_frontend_store_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   STRIPE_API_KEY=your_stripe_key
   ```

4. **Set up Prisma**:

   Generate the Prisma client and migrate the database:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000`.

## Usage

- **Stores**: Admins can create new stores, switch between existing stores, and manage store settings.
- **Products**: Add, update, or remove products from the selected store.
- **Sales Dashboard**: View sales performance for each store.
- **Authentication**: Users must log in using Clerk to access the dashboard.
- **Payments**: Payments for the products are handled via Stripe integration.

## Deployment

You can deploy this project on platforms like Vercel, Netlify, or any other hosting service that supports Next.js.

### Deploy on Vercel

1. Connect your repository to Vercel.
2. Set up the environment variables on Vercel (same as in your `.env` file).
3. Deploy the project with one click.

## Contributing

Feel free to contribute by submitting a pull request, creating issues, or providing feedback. All contributions are welcome!

## License

This project is licensed under the MIT License.
