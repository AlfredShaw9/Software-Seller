// & Import packages
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// & Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// Remove password from response
userSchema.set('toJSON',{
  virtuals: true,
  transform(doc, json){
    delete json.password
  },
})

// & Virtual Field for password confirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmationValue){
    this._passwordConfirmation = passwordConfirmationValue
  })

// Pre-validate
userSchema.pre('validate',function(next){
  if (this.isModified('password') && this.password !== this._passwordConfirmation){
    this.invalidate('passwordConfirmation','Please ensure passwords match')
  }
  next()
})

// Hash & save
userSchema.pre('save', function(next){
  if (this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
  }
  next()
})

// & Create model
export default mongoose.model('User', userSchema)