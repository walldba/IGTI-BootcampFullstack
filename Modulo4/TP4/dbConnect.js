import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cursoigti.uefer.azure.mongodb.net/Curso?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log("Erro ao conectar no MongoDB");
  }
}
