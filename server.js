import express from 'express';
import cors from 'cors';
import db from './app/models/index.js'
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import ticketRoutes from './app/routes/ticket.routes.js'

const app = express();
const Category = db.category;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Hammas Ticket Management System"})
})

const initial = () => {
  Category.create({
    id: 1,
    category: 'Bug',
  })
  
  Category.create({
    id: 2,
    category: 'Feature Request',
  })
  
  Category.create({
    id: 3,
    category: 'Task',
  })
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`)
});

db.sequelize.sync();

authRoutes(app);
userRoutes(app);
ticketRoutes(app);