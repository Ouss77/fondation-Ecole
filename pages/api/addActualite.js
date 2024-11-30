import formidable from "formidable";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "actualites.json");

// Configure formidable
export const config = {
  api: {
    bodyParser: false, // Disables the default body parser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: "Error parsing the form" });
      }

      // Extract fields as strings
      const title = fields.title ? fields.title.toString() : "";
      const description = fields.description ? fields.description.toString() : "";
      const image = files.image ? `/uploads/${files.image.newFilename}` : "/carousel1.webp";

      // Read existing data
      let actualites = [];
      try {
        const fileData = fs.readFileSync(dataFilePath, "utf-8");
        actualites = JSON.parse(fileData);
      } catch (error) {
        console.error("Error reading actualites file", error);
      }

      // Add the new actualité
      const newActualite = { title, description, image };
      actualites.push(newActualite);

      // Save updated data
      try {
        fs.writeFileSync(dataFilePath, JSON.stringify(actualites, null, 2));
        return res.status(200).json({ message: "Actualité added successfully!" });
      } catch (error) {
        return res.status(500).json({ message: "Failed to save Actualité" });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
