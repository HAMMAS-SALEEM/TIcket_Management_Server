import express from 'express';
import cors from 'cors';
import db from './app/models/index.js'
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import ticketRoutes from './app/routes/ticket.routes.js'
import categoryRoutes from './app/routes/category.routes.js';

const app = express();
const Category = db.category;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Hammas Ticket Management System"})
})

const initial = async () => {
  try {
    const categoryCount = await Category.count();

    if (categoryCount === 0) {
      await Category.create({ category: 'Bug' });
      await Category.create({ category: 'Feature Request' });
      await Category.create({ category: 'Task' });

      console.log('Initial categories created successfully.');
    } else {
      console.log('Categories already exist. Initial method skipped.');
    }
  } catch (error) {
    console.error('Error creating/checking initial categories:', error.message);
  }
};

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`)
});

db.sequelize.sync().then(() => {
  initial();
});

authRoutes(app);
userRoutes(app);
ticketRoutes(app);
categoryRoutes(app);