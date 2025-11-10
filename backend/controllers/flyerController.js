const Flyer = require('../models/Flyer');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// POST /api/flyers/:id/like
exports.likeFlyer = async (req, res) => {
	try {
		const flyer = await Flyer.findById(req.params.id);
		if (!flyer) return res.status(404).json({ message: 'Flyer not found' });
		const userId = req.user._id;
		if (flyer.likedBy.includes(userId)) {
			flyer.likedBy.pull(userId);
			flyer.likes = Math.max(0, flyer.likes - 1);
		} else {
			flyer.likedBy.push(userId);
			flyer.likes += 1;
		}
		await flyer.save();
		res.json({ likes: flyer.likes, likedBy: flyer.likedBy });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// POST /api/flyers/:id/download
exports.downloadFlyer = async (req, res) => {
	try {
		const flyer = await Flyer.findById(req.params.id);
		if (!flyer) return res.status(404).json({ message: 'Flyer not found' });
		flyer.downloads = (flyer.downloads || 0) + 1;
		await flyer.save();
		const downloadUrl = `${req.protocol}://${req.get('host')}${flyer.imageUrl}`;
		res.json({ downloadUrl, downloads: flyer.downloads });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// POST /api/flyers/:id/purchase
exports.purchaseFlyer = async (req, res) => {
	try {
		const flyer = await Flyer.findById(req.params.id);
		if (!flyer) return res.status(404).json({ message: 'Flyer not found' });
		flyer.purchases = (flyer.purchases || 0) + 1;
		await flyer.save();
		res.json({ purchases: flyer.purchases });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// POST /api/flyers/:id/comment
exports.commentFlyer = async (req, res) => {
	try {
		const flyer = await Flyer.findById(req.params.id);
		if (!flyer) return res.status(404).json({ message: 'Flyer not found' });
		const comment = {
			user: req.user._id,
			text: req.body.text,
			createdAt: new Date()
		};
		flyer.comments.push(comment);
		await flyer.save();
		res.json(flyer.comments);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// POST /api/flyers (with image upload)
exports.createFlyer = async (req, res) => {
	try {
		const { caption } = req.body;
		const user = req.user;
		if (!req.file) return res.status(400).json({ message: 'Image is required' });
		const imageUrl = `/uploads/${req.file.filename}`;
		const flyer = await Flyer.create({
			author: user._id,
			authorName: user.name,
			imageUrl,
			caption
		});
		res.status(201).json(flyer);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// GET /api/flyers
exports.getFlyers = async (req, res) => {
	try {
		const flyers = await Flyer.find().sort({ createdAt: -1 });
		res.json(flyers);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
