const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // Required for writing images to file system
const cors = require('cors')
const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(cors())
// Route to handle the POST request containing the array of Base64-encoded images
app.post('/uploadImages', (req, res) => {
    const images = req.body.images;

    // Process each Base64-encoded image and save it to the file system
    images.forEach((base64Image, index) => {
        // Remove header from base64 data
        const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, "");

        // Write image to file system
        fs.writeFile(`image_${index}.jpeg`, base64Data, 'base64', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving image');
            } else {
                console.log(`Image_${index}.jpeg saved successfully`);
            }
        });
    });

    console.log(req.body.productName)

    res.status(200).send('Images uploaded successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
