import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema({
  id: { type: String, required: true },
  status: { type: String, required: true },
  make: { type: String, required: true },
  year: { type: Date, required: true },
  trailer_type: { type: String, required: true },
  trailer_axles: { type: String, required: true },
  chase_number: { type: String, required: true },
  engine_number: { type: String, required: true },
  insurance_policy: { type: String, required: true },
  uploads: {
    type: Object,
    required: true,
    vehicle_picture: {
      type: String,
      required: true,
    },
    registeration_document: {
      type: String,
      required: true,
    },
  },
  other_details: {
    type: Object,
    required: true,
    shipper_id: { type: String, required: true },
    approved_by: { type: String, required: true },
    rejected_by: { type: String, required: true },
  },
});

export default mongoose.model('Vehicle', vehicleSchema);
