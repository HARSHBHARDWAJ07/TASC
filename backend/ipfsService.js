// ipfsService.js
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

export async function uploadToIPFS(content) {
  try {
    // Create a FormData instance and append the blog content.
    const formData = new FormData();
    formData.append("file", content, { filename: "blogpost.txt" });
    
    // Create a basic auth string from your Infura credentials.
    const auth = Buffer.from(
      `${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_PROJECT_SECRET}`
    ).toString("base64");

    // Post the file to Infura's IPFS endpoint.
    const response = await axios.post(
      "https://ipfs.infura.io:5001/api/v0/add",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Basic ${auth}`,
        },
      }
    );

    // Extract the returned IPFS hash and return a public URL.
    const ipfsHash = response.data.Hash;
    return `https://ipfs.infura.io/ipfs/${ipfsHash}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error.message);
    throw new Error("Failed to upload to IPFS");
  }
}
