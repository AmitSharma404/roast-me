import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  roastResume,
  roastGitHub,
  roastPortfolio,
  getRoastLevels
} from '../controllers/roastController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'text/plain'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and TXT files are allowed.'), false);
  }
};

const maxFileSizeMB = parseInt(process.env.MAX_FILE_SIZE_MB || '5');
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: maxFileSizeMB * 1024 * 1024 // Convert MB to bytes
  }
});

// Get available roast levels
router.get('/levels', getRoastLevels);

// Roast a resume (file upload)
router.post('/resume', upload.single('resume'), roastResume);

// Roast a GitHub profile
router.post('/github', roastGitHub);

// Roast a portfolio website
router.post('/portfolio', roastPortfolio);

export default router;
