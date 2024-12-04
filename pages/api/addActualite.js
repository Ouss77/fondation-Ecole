import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable default Next.js body parser for file uploads
export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing
  },
};

const dataFilePath = path.join(process.cwd(), "data", "actualites.json");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
    });

    // Parsing the form data (this includes files)
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing the form:", err);
        return res.status(500).json({ message: "Error parsing the form" });
      }

      console.log("Fields:", fields); // Log fields data


      const title = fields.title ? fields.title[0] : "";
      const description = fields.description ? fields.description[0] : "";
      const image = files.image ? `/uploads/${Array.isArray(files.image) ? files.image[0].newFilename : files.image.newFilename}` : "/carousel1.webp";

      // Read the existing actualites from the JSON file
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

      // Save the updated data back to the file
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
