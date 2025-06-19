const Annoncement = require("../models/Announcement");

//all
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Annoncement.find()
        
        if (announcements.length === 0 ) {
            return res.staus(404).json({ message: "No announcements to display"})
        }

        res.status(201).json(announcements)
    } catch (error) {
        res.status().json({ error: error.message })
    }
}


//one
const getAnnouncement = async (req, res) => {
    try {
        const announcement = await Annoncement.findById(req.params.id).populate("driver")
        
        if (!announcement) {
            return res.status(404).json({ error: "Announcement not found"})
        }
        
        res.status(201).json(announcement)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//create
const createAnnoncement = async (req, res) => {
  try {
    const {
      startPoint,
      wayPoints,
      destination,
      maxDimensions,
      packagesTypes,
      availableCapacity,
      startDate,
    } = req.body;

    const announcement = new Annoncement({
      driver: req.user.id,
      startPoint,
      wayPoints,
      destination,
      maxDimensions,
      packagesTypes, 
      availableCapacity,
      startDate
    });

    await announcement.save()
    //await notifyDriver(announcement)

    res.status(201).json(announcement)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const updateAnnouncement = async (req, res) => {
    try {
        const updatedAnnouncement = await Annoncement.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true}
        ).populate("driver")

        if (!updatedAnnouncement) {
            return res.status(404).json({ message: "Announce not found"})
        }

        res.status(201).json(updatedAnnouncement)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}







