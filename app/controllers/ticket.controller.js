import db from "../models/index.js";

const Ticket = db.ticket;

const getAllTickets = (req, res) => {
  Ticket.findAll({
    where: {
        userId: req.body.userId 
    }
  })
  .then((tickets) => {
    if(!tickets) {
        return res.status(404).send({ message: "No Tickets Found!"})
    }
    res.status(200).send({tickets: tickets})
  })
  .catch((error) => {
    return res.status(500).send({message: error.message})
  })
}

const createTicket = (req, res) => {
    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        ticketStatus: req.body.ticketStatus,
        userId: req.body.userId,
        categoryId: req.body.categoryId
    })
    .then(() => res.status(200).send({ message: "Ticket Created Successfully"}))
    .catch((error) => res.status(500).send({ message: error.message}))
}

export { getAllTickets, createTicket }