import * as mongoose from "mongoose";

const dbConfig = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Mongodb connected`))
    // .catch((err) => error({ message: `${err}`, badge: true }))
    .catch((err) => console.error(err));
};

export default dbConfig;
