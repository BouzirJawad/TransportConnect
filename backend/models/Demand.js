const mongoose = require('express')

const DemandSchema = new mongoose.Schema({
    shipper: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    announcement: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Announcement' 
    },
    packages: [{
        title: String,
        dimensions: {
            length: Number,
            width: Number,
            height: Number
        },
        weight: Number,
        type: String
    }],
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'in-transit', 'delivered', 'cancelled'], 
        default: 'pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    deliveredAt: Date
});

const demandModel = mongoose.model('Demand', DemandSchema)

module.exports = demandModel

