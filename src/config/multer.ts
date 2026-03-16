import multer from "multer";

// Usar o memoryStore pra manter o arquivo em memoria e enviar diretamente para o cloudinary;

export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req: any, file:Express.Multer.File, cb:any) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    }
}