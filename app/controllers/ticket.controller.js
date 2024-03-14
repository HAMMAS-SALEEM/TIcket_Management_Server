import db from "../models/index.js";

const Ticket = db.ticket;

const getAllTickets = (req, res) => {
  Ticket.findAll({
    where: {
        userId: req.userId
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
    .then((ticket) => res.status(200).send({ message: "Ticket Created Successfully", ticket}))
    .catch((error) => res.status(500).send({ message: error.message}))
}

const updateTicketStatus = (req, res) => {
  const { id, ticketStatus } = req.body;

  const ticket = {
    ticketStatus,
  };

  Ticket.update(ticket, {
    where: {
      id
    }
  })
  .then((updatedTicket) => {
    return res.status(200).send({message: "Ticket Updated", updatedTicket})
  })
  .catch((error) => {
    return res.status(404).send({message: error.message})
  })
}

const deleteTicket = (req, res) => {
  Ticket.destroy({
    where: {
      id: req.body.id,
    }
  })
  .then((ticket) => {
    if(!ticket) {
      return res.status(404).send({ message: "Ticket doesn't exist"})
    }
    return res.status(200).send({ message: "Ticket Deleted Successfully!"})
  })
  .catch((error) => {
    return res.status(404).send({ message: error.message })
  })
}

export { getAllTickets, createTicket, updateTicketStatus, deleteTicket };