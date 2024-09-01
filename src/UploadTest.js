const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const form = new FormData();
form.append("prompt", "Test Prompt");
form.append("genre", "Test Genre");
form.append("duration", 30);
form.append("file", fs.createReadStream("C:\\Users\\yasht\\Downloads\\sr.wav")); // Use absolute path

axios
  .post("http://localhost:5000/api/music", form, {
    headers: {
      ...form.getHeaders(),
    },
  })
  .then((response) => {
    console.log("Upload successful:", response.data);
  })
  .catch((error) => {
    console.error("Error uploading file:", error);
  });
