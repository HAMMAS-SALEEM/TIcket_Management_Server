export default (sequelize, Sequelize) => (
  sequelize.define("users", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: {
          args: true,
          msg: "This should be an email"
        }
    },
    password: {
        type: Sequelize.STRING,
    }
  })
);