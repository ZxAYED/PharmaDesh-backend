/* eslint-disable no-undef */
import cloudinary from 'cloudinary';

import AppError from '../Error/AppError';
import config from '../config';
import { Readable } from 'stream';

cloudinary.v2.config({
    cloud_name: config.cloudinary_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

const UploadImageToCloudinary = async (imageName: string, fileBuffer: Buffer) => {
    return new Promise<{ message: string; url: string }>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { public_id: imageName.trim() },
            (error, result) => {
                if (error) {
                    reject(new AppError(500, 'Error uploading image to Cloudinary'));
                    return;
                }

                resolve({ message: 'Image uploaded successfully', url: result?.secure_url || "" });
            }
        );

        const fileStream = Readable.from(fileBuffer);
        fileStream.pipe(uploadStream);
    });
};


export default UploadImageToCloudinary;
