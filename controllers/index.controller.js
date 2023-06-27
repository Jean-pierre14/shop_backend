export const createData = async (req, res) => {
  res.json({ message: "Post" });
};

export const getAll = async (req, res) => {
  res.json({ message: "Get All" });
};

export const getOne = async (req, res) => {
  res.json({ message: "Get one" });
};

export const updateData = async (req, res) => {
  res.json({ message: "Update" });
};

export const deleteOne = async (req, res) => {
  res.json({ message: "Delete one" });
};
