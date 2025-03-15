/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  email_user: process.env.CONFIG_EMAIL_USER,
  email_pass: process.env.CONFIG_EMAIL_PASS,
  base_url: process.env.BASE_URL,
  SP_USERNAME: process.env.SP_USERNAME,
  SP_PASSWORD: process.env.SP_PASSWORD,
  SP_PREFIX: process.env.SP_PREFIX,
  SP_ENDPOINT: process.env.SP_ENDPOINT,
  SP_RETURN_URL: process.env.SP_RETURN_URL,
  DB_FILE: process.env.DB_FILE,
  appPassword: process.env.APP_PASSWORD,
  appGmail: process.env.APP_GMAIL,
}
