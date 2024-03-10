export default (sequelize, Sequelize) => (
    sequelize.define("categories", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })
)