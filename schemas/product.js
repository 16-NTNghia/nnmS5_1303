const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, },
  description: { type: String, default: '', },
  quantity: { type: Number, min: 0, },
  price: { type: Number, min: 0, },
  urlImg: { type: String, default: '', },
  category: { type: String, ref: 'Category'},
  isDeleted: { type: Boolean, default: false, },
},{   
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);