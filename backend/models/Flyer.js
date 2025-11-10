const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	text: String,
	createdAt: { type: Date, default: Date.now }
});

const flyerSchema = new mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	authorName: { type: String, required: true },
	imageUrl: { type: String, required: true },
	caption: { type: String },
	likes: { type: Number, default: 0 },
	likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	comments: [commentSchema],
	downloads: { type: Number, default: 0 },
	purchases: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flyer', flyerSchema);
