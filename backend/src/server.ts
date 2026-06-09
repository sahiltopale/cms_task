import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import sequelize from "./config/database";
import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";
import postRoutes from "./routes/postRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("CMS API Running");
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });

export default app;
