const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  weight: { type: Number, required: true },
  type: { type: String, required: true }
}, { _id: false });

const DemandSchema = new mongoose.Schema({
    shipper: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    announcement: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Announcement',
        required: [ true, "Announce id is required"]
    },
    packages: {
    type: [PackageSchema],
    required: true,
    validate: [arr => arr.length > 0, "At least one package is required"]
  },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'in-transit', 'delivered', 'cancelled'], 
        default: 'pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    deliveredAt: {
        type: Date
    }
});

const demandModel = mongoose.model('Demand', DemandSchema)

module.exports = demandModel

