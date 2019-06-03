const { validationResult } = require('express-validator/check');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuidv4');
const { Image } = require('../db/models');
const config = require('../config');


module.exports = {
  upload(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    aws.config.update({
      accessKeyId: config.awsS3AccessKeyId,
      secretAccessKey: config.awsS3SecretAccessKey,
    });

    const spacesEndpoint = new aws.Endpoint(config.awsS3Endpoint);
    const s3 = new aws.S3({
      endpoint: spacesEndpoint,
    });

    let filename = uuid();
    const upload = multer({
      storage: multerS3({
        s3,
        bucket: config.awsS3Bucket,
        acl: 'public-read',
        key(request, file, cb) {
          filename += `-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }).single('upload');

    upload(req, res, (error) => {
      if (error) {
        return res.status(500).json({ message: `Unable to upload file: ${error}` });
      }

      return Image.create({
        user_id: req.user.id,
        filename,
      }).then(() => res.status(201).send({ filename, message: 'Item successfully added!' }))
        .catch(e => res.status(500).send(e));
    });
  },
};
