export default (sequelize, Sequelize) => (
  sequelize.define("users", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [3, 50],
            msg: "Username must be between 3 and 50 characters"
          },
        }
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