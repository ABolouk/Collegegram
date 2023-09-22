import multer from 'multer';
import * as minio from 'minio';
import multerMinIOStorage from 'multer-minio-storage';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './media')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + req.user.username + "-" + file.originalname)
    }
})
export const upload = multer({ storage: storage })

const multipleStorage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './media' + '/posts/' + req.user.id) },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + req.user.username + "-" + file.originalname);
    }
})
export const uploadMultiple = multer({ storage: multipleStorage });

const minioClient = new minio.Client({
    endPoint: 'collegegrammedia.darkube.app',
    accessKey: 'HfelzkUMdJFYpmFtISkcA2Q8OVmo9C33',
    secretKey: 'lx3TGY1OiRXdeAs0Fp8QBvYvFdgsoqQG',
});

const minIOStorage = multerMinIOStorage({
    minioClient: minioClient,
    bucket: 'mediacollegegram',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname)
    }
})

export const uploadMinIO = multer({storage : minIOStorage})