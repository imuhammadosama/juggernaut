import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  status: { type: String, required: true },
  company_id: { type: String, required: true },
  company_name: { type: String, required: true },
  name: { type: String, required: true },
  cnic: { type: Number, required: true },
  father_name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  designation: { type: String, required: true },
  address: {
    type: Object,
    required: true,
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalcode: { type: Number, required: true },
  },
  emergency: {
    type: Object,
    required: true,
    name: { type: String, required: true },
    relation: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  added_by: { type: Number, required: true },
});

export default mongoose.model('User', userSchema);
