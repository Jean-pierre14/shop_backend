import * as mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    // user_id: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const DataModel = new mongoose.model("data", dataSchema);

export default DataModel;
