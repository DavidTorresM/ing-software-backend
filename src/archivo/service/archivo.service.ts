import { Request, Response, Injectable } from '@nestjs/common';
import * as multer from  'multer';
import * as AWS from 'aws-sdk';
import * as multers3 from 'multer-s3';

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: 'AKIAJYK5ZVNOIX2B5FUQ',
  secretAccessKey: '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',
  region: 'us-east-2',
});

@Injectable()
export class ArchivoService {
  constructor(){}

  upload = multer({
    storage: multers3({
      s3: s3,
      bucket: 'archivos-polimeet',
      acl: 'public-read',
      key: (request, archivo, cb) => {
        cb(null, `${Date.now().toString()} - ${archivo.originalname}`);
      },
    }),
  }).array('archivo', 1);

  async subirArchivo(@Request() req, @Response() res) {
    try {
      this.upload(req, res, err => {
        if (err) {
          console.log('Hubo un error en subirArchivo:', err.message);
          return res.status(404).json(`Error al subir el archivo a amazon: ${err.message}`);
        }

        return res.status(201).json(req.files[0].location);
      });
    } catch (err) {
      console.log('Error:', err.message);
      return res.status(500).json(`Error al subir un archivo: ${err.message}`);
    }
  }
}
