import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `resume-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const DATA_FILE = path.join(process.cwd(), "portfolio-data.json");
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  // API routes
  app.get("/api/portfolio", (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to read data" });
    }
  });

  app.post("/api/portfolio", (req, res) => {
    const { password, data } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      res.json({ message: "Data updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save data" });
    }
  });

  app.post("/api/upload-resume", upload.single("resume"), (req: any, res) => {
    const password = req.body.password;
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Serve uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
