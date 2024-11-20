const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cros = require("cors")


const app = express();
app.use(express.json()); // Parseo de JSON en las solicitudes
app.use(cros());

// Configuración de MongoDB
const MONGO_URI = "mongodb://localhost:27017"; // Cambia esto según tu configuración
const DB_NAME = "test"; // Nombre de la base de datos
const COLLECTION_NAME = "news"; // Nombre de la colección

let db, newsCollection;

// Conectar a MongoDB y configurar la colección
MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db(DB_NAME);
    newsCollection = db.collection(COLLECTION_NAME);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Rutas para `/news`

// Obtener todas las noticias
app.get("/news", async (req, res) => {
  try {
    const news = await newsCollection.find().toArray();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Crear una nueva noticia
app.post("/news", async (req, res) => {
  try {
    const { title, description, content, author } = req.body;

    // Validar que se reciban los campos requeridos
    if (!title || !description || !content || !author) {
      return res
        .status(400)
        .json({ error: "Title, content, and author are required" });
    }

    // Generar automáticamente la fecha en formato ISO
    const date = new Date().toISOString();

    // Insertar la noticia en la base de datos
    await newsCollection.insertOne({
      title,
      content,
      description,
      author,
      date,
    });

    res.status(201).json({
      message: "News successfully saved",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create news" });
  }
});

// Actualizar una noticia
app.patch("/news/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Verifica si el ID es válido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    // Convertir el ID a ObjectId
    const objectId = new ObjectId(id);

    // Buscar la noticia por ID para verificar si existe
    const updateNews = await newsCollection.findOne({ _id: objectId });
    if (!updateNews) {
      return res.status(404).json({ error: "News not found" });
    }

    // Si la noticia ya tiene el campo archiveDate, no la actualizamos
    if (updateNews.archiveDate) {
      return res.status(400).json({ error: "News is already archived" });
    }

    // Siempre agregar archiveDate con la fecha y hora actual en formato ISO
    const archiveDate = new Date().toISOString();

    // Actualizar la noticia en la base de datos
    const result = await newsCollection.updateOne(
      { _id: objectId },
      { $set: {archiveDate} }
    );

    result.matchedCount === 0
      ? res.status(404).json({ error: "News not found" })
      : res.status(201).json({ message: "News updated successfully"});
    
  } catch (err) {
    res.status(500).json({ error: "Failed to update news" });
  }
});

// Eliminar una noticia
app.delete("/news/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Verifica si el ID es válido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    // Convertir el ID a ObjectId
    const objectId = new ObjectId(id);

    const result = await newsCollection.deleteOne({ _id: objectId });

    result.deletedCount === 0
      ? res.status(404).json({ error: "News not found" })
      : res.status(201).json({ message: "News successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete news" });
  }
});

// Manejo de errores genéricos
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
