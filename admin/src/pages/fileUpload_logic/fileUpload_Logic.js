import Swal from "sweetalert2";

async function uploadToS3(file) {
  if (!file) {
    throw new Error("Please select a file first.");
  }

  const fileName = file.name;
  const contentType = file.type;
  const domain = "MOVIE"; // Adjust as needed

  try {
    // POST request to your backend
    const response = await fetch(
      "https://king-prawn-app-4l8vr.ondigitalocean.app/v1/s3/generate-presigned-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName, domain, contentType }),
      }
    );

    const data = await response.json();

    // PUT request to S3 using the pre-signed URL
    const result = await fetch(data.presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (result.status !== 200) {
      throw new Error("Upload failed.");
    }

    return data.s3url;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default uploadToS3;
