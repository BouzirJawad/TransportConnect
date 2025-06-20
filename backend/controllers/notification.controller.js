const notifyShippersAboutNewAnnouncement = async (announcement) => {
  // Find shippers who might be interested (based on destination/package types)
  const shippers = await User.find({ 
    role: 'shipper',
  });
  
  await Notification.insertMany(
    shippers.map(shipper => ({
      user: shipper._id,
      title: 'New Shipping Announcement',
      message: `A new route to ${announcement.destination} is available`,
      type: 'announcement',
      relatedEntity: announcement._id
    }))
  );
  
  // Could also implement WebSocket or push notifications here
};