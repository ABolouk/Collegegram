import multer from 'multer';
import * as minio from 'minio';
import multerMinIOStorage from 'multer-minio-storage';


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

export const uploadMinIO = multer({storage: minIOStorage})

const minIOAvatarStorage = multerMinIOStorage({
    minioClient: minioClient,
    bucket: 'collegegram-avatars',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname)
    }
})


export const uploadAvatarMinIO = multer({storage: minIOAvatarStorage})

