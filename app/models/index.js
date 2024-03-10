import config from "../config/db.config.js";
import { Sequelize } from "sequelize";
import createUserModel from "../models/user.model.js";
import categoryModel from "./category.model.js";
import ticketModel from './ticket.model.js';

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
      host: config.HOST,
      dialect: config.dialect,
  }
)

const User = createUserModel(sequelize, Sequelize);
const Category = categoryModel(sequelize, Sequelize);
const Ticket = ticketModel(sequelize, Sequelize);

// Set up associations
User.hasMany(Ticket, { as: "tickets" });
Ticket.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
})
Category.hasMany(Ticket, { as: "tickets" });
Ticket.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category"
})

const db = {
  Sequelize,
  sequelize,
  user: User,
  category: Category,
  ticket: Ticket,
};

export default db;