import db from "../models/index.js";

const Category = db.category;

const getAllCategories = (req, res) => {
  Category.findAll().then((categories) => {
    if(!categories) {
        res.status(400).send({ message: "No Categories Found!"})
    }
    return res.status(200).send({categories})
  })
  .catch((error) => {
    return res.status(404).send({ message: error.message })
  })
}

export default getAllCategories;