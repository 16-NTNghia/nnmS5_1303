const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  origin: { type: String, default: '' },
  sold: { type: Number, default: 0 },
  supplier: { type: String, default: '' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  thumbnail_url: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  images: { type: Array, default: '' },
  numberOfReview: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true },
  _destroy: { type: Boolean, default: false },
  hot: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false }
},{   
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);