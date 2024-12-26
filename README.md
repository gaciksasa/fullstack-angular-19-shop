# Shop App - Full Stack E-commerce Application

A modern e-commerce application built with Angular 19 for the frontend and Node.js/Express/MongoDB for the backend. Features include product browsing, category filtering, shopping cart functionality, and checkout process.


## Prerequisites

- Node.js (v22 or higher)
- MongoDB
- Angular CLI

## Backend Setup

1. Navigate to backend directory:
```bash
cd shop-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root directory:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/shop
```

4. Start MongoDB service:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

5. Seed the database:
```bash
node scripts/seed.js
```

6. Start the server:
```bash
node server.js
```

The backend will be running on `http://localhost:3000`

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd shop-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

The application will be running on `http://localhost:4200`

## Features

- Product listing with category filtering
- Search functionality
- Shopping cart
- Product details with image carousel
- Responsive design with Tailwind CSS
- Checkout process

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID

## Built With

- Frontend:
  - Angular 19
  - Tailwind CSS
  - RxJS

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Development

To work on new features:

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Add your feature"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

## Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License

Would you like me to add any additional sections or provide more detailed instructions for any particular aspect?