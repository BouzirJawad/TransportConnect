const mongoose = require("mongoose")

const AnnouncementSchema = new mongoose.Schema({
  driver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  startPoint: { 
    type: String, 
    required: true 
  },
  waypoints: [{ 
    type: String
  }],
  destination: { 
    type: String,
    required: true
  },
  maxDimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  packageTypes: [{ 
      type: String 
  }],
  availableCapacity: { 
    type: Number, 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const annonceModel = mongoose.model('Annonce', AnnouncementSchema)

module.exports = annonceModel


