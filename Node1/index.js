const express = require("express");
const fs = require("fs");
const path = require("path");

const app= express();
const port = 3000;
const folderPath = path.join(__dirname,"public");

if(!fs.existsSync(folderPath)) {
    console.log("Creating public folder");
    fs.mkdirSync(folderPath);
}

app.post("/create-file", (req,res) => {
    const timestamp = new Date();
    const fileName = `${timestamp.toISOString().replace(/:/g, "-")}.txt`;
    const filePath = path.join(folderPath,fileName);

    fs.writeFile(filePath, timestamp.toString(), (err) => {
        if(err) {
            console.log("Error creating file", err);
            return res.status(500).json({message:`Error writing file - ${err}`});
        }
        res.json({message:"File created successfully", fileName});
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});