import { useEffect, useState } from "react";

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    // Fetch the PDFs from the PHP backend
    const fetchPdfs = async () => {
      try {
        const response = await fetch("api/getPdfs.php");
        const data = await response.json();
        setPdfs(data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfs();
  }, []);

  const handleDownload = (pdf) => {
    const blob = new Blob([pdf], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `plaquette_${pdf.annee}.pdf`;
    link.click();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">List of PDFs</h1>
      <div className="mt-4 space-y-4">
        {pdfs.map((pdf) => (
          <div key={pdf.annee} className="flex justify-between items-center p-4 bg-white shadow-md rounded-md">
            <span className="text-lg">{pdf.annee}</span>
            <button
              onClick={() => handleDownload(pdf.plaquettePDF)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfList;
