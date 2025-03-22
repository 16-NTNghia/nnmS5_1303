const mongoose = require('mongoose');
let bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, },
  password: { type: String, required: true, },
  email: { type: String, required: true,unique: true, },
  fullName: { type: String, default: '', },
  avatarUrl: { type: String, default: '', },
  status: { type: Boolean, default: false, },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'role'},
  loginCount: { type: Number, default: 0, min: 0},
  isDeleted: { type: Boolean, default: false, },
},{   
  timestamps: true,
});

userSchema.pre('save',function(next){
  if(this.isModified("password")){
      let salt = bcrypt.genSaltSync(10);
      let encrypted = bcrypt.hashSync(this.password+"",salt);
      this.password =encrypted;
  }
  next()
})

module.exports = mongoose.model('user', userSchema);