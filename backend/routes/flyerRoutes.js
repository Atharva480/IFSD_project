const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const flyerController = require('../controllers/flyerController');

// Set up multer for image uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });


router.post('/', protect, upload.single('image'), flyerController.createFlyer);
router.get('/', flyerController.getFlyers);
router.post('/:id/like', protect, flyerController.likeFlyer);
router.post('/:id/comment', protect, flyerController.commentFlyer);
router.post('/:id/download', protect, flyerController.downloadFlyer);
router.post('/:id/purchase', protect, flyerController.purchaseFlyer);

module.exports = router;
