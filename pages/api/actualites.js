import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "actualites.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const actualites = JSON.parse(fileData);
    
    res.status(200).json(actualites);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
