import { Router, Request, Response } from "express";
import db from "../db/db";
import multer from 'multer'
import path from "path"
import fs from 'fs'

const router = Router();
// HELP ADD FILE IMG TO FOLDER IMAGES (I CAN USE MODULE FS....)
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, path.join(__dirname,'../images'));
     },
     filename: function (req, file, cb) {
       cb(null, file.originalname);
     }
   });
   const upload = multer({ storage: storage });
// END 

// THERE IS middleware BY MULTER THAT ADD FILE
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
 

 
router.get('/imageUrls', (req, res) => {

  const imageDirectory = path.join(__dirname, '../images');
  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error('Error reading image directory:', err);
      res.status(500).send('Internal server error');
    } else {
      const imageUrls = files.map(file => `/images/${file}`);
      res.json(imageUrls);
    }});
});



  export default router;