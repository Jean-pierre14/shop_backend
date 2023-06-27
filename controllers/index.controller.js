import DataModel from "./../models/index.model.js";

export const createData = async (req, res) => {
  const { name, quantity, size } = req.body;

  const data = await DataModel.create({
    name,
    quantity,
    size,
  });

  if (data) {
    res.json({ msg: "data register " + data }).status(201);
  } else {
    res.json({ msg: "Error db" }).status(500);
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.json(data);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

export const getOne = async (req, res) => {
  let dataId = req.params.id;
  await DataModel.findById(dataId)
    .then((data) => res.json({ msg: data }).status(201))
    .catch((error) => res.status(500).json({ msg: error.message }));
};

export const updateData = async (req, res) => {
  res.json({ message: "Update" });
};

export const deleteOne = async (req, res) => {
  let dataId = req.params.id;
  await DataModel.findOneAndDelete(dataId)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
