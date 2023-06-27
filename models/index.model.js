import * as mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const DataModel = new mongoose.model("data", dataSchema);

export default DataModel;
