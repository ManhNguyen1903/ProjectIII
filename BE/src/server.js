const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Make sure CORS is imported if required

// Load environment variables
dotenv.config();

const app = express();

// Middleware for parsing JSON and enabling CORS (if required)
app.use(express.json());
app.use(cors()); // Enable CORS for all incoming requests (you can configure if needed)

// Import routes
const categoryRoutes = require('./routes/CategoryRoutes');
// Use routes
app.use('/api/categories', categoryRoutes);

const employeeRoutes = require('./routes/EmployeeRoutes');
app.use('/api/employees', employeeRoutes);

// Connect to MongoDB
const dbUri = `${process.env.MONGODB_URI}${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after MongoDB connection
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
