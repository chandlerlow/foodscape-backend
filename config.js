require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'milkroad',
  saltRounds: 12,
  awsS3Endpoint: process.env.AWS_S3_ENDPOINT,
  awsS3Bucket: process.env.AWS_S3_BUCKET,
  awsS3AccessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  awsS3SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
};
