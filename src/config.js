module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "production",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://postgres@localhost/custaframe",
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  Bucket: process.env.Bucket,
};
