import DataModel from "./../models/index.model.js";

export const createData = async (req, res) => {
  const { name, quantity, size } = req.body;

  try {
    const data = await DataModel.create({
      name,
      quantity,
      size,
    });

    if (data) {
      res.status(201).json({ msg: "Data registered: " + data });
    } else {
      res.status(500).json({ msg: "Error in the database" });
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({ msg: "Error in the server" });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.status(200).json(data);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({ msg: "Error in the server" });
  }
};

export const getOne = async (req, res) => {
  let dataId = req.params.id;
  try {
    const data = await DataModel.findById(dataId);
    if (data) {
      res.status(200).json({ msg: data });
    } else {
      res.status(404).json({ msg: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateData = async (req, res) => {
  let dataId = req.params.id;
  const { name, quantity, size } = req.body;

  try {
    const data = await DataModel.findByIdAndUpdate(
      dataId,
      {
        name,
        quantity,
        size,
      },
      { new: true }
    );

    if (data) {
      res.status(200).json({ msg: "Data updated successfully" });
    } else {
      res.status(404).json({ msg: "Data not found" });
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({ msg: "Error in the server" });
  }
};

export const deleteOne = async (req, res) => {
  let dataId = req.params.id;

  try {
    const data = await DataModel.findByIdAndDelete(dataId);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "Data not found" });
    }
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({ msg: "Error in the server" });
  }
};
