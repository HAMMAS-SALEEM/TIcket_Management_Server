export default (sequelize, Sequelize) => (
    sequelize.define("tickets", {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
       type: Sequelize.STRING, 
      },
      ticketStatus: {
        type: Sequelize.STRING
      },
    })
)