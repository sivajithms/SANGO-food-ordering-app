import express from 'express';
import multer from 'multer';
import { s3Upload } from '../../Utils/AWS/s3';

//Database model 
import { ImageModel } from '../../database/allModels';

const Router = express.Router();

//multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
Route       /
Descri      Uploading given image to S3 bucket, and then saving the file to mongodb
Params      none
Access      Public  
Method      GET
*/

Router.post('/', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        //S3 public option
        const bucketOptions = {
            Bucket: 'sango-app',
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        const uploadImage = await s3Upload(bucketOptions);
        return res.json({ uploadImage });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default Router; 