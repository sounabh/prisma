import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import userRouter from "./routes/userRoutes.js"
import postRouter from "./routes/postRoutes.js"

// Initialize the app
const app = express();

// Configure dotenv
dotenv.config();

// Set the port number from environment variable (fallback to 3000 if not set)
const port = process.env.PORT || 3000;

// Middleware for serving static files (optional)
// app.use(express.static('public'));


app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use("/api",userRouter)
app.use("/api",postRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
