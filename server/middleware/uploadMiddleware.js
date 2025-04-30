import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs/promises';

export const uploadResume = async (req, res, next) => {
  if (!req.files?.resume) return next();

  try {
    const result = await cloudinary.uploader.upload(req.files.resume.tempFilePath, {
      folder: 'job-portal/resumes',
      resource_type: 'auto'
    });
    
    req.body.resumeUrl = result.secure_url;
    await unlink(req.files.resume.tempFilePath);
    next();
  } catch (error) {
    next(error);
  }
};