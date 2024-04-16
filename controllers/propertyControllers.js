const User = require('../models/userModel');
const Properties = require('../models/propertiesModel');

const addProperty = async (req,res) => {
    const {phone, location, price, image} = req.body;
    const ownerId = req.user._id;
    if(!phone || !location || !price || !image){
        return res.status(400).json({error:"All fields are required!"});
    }

    try {
        const property = await Properties.create({phone, location, price, image,ownerId});

        if(!property){
            return res.status(400).json({error: "Failed to add property!"});
        }
        res.status(200).json(property);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server error!"});
    }
}

const pendingReview = async (req, res) => {
    try {
        const properties = await Properties.find({ status: false });

        res.status(200).json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const approvedProperties = async (req,res) => {
    try {
        const properties = await Properties.find({status:true});
        res.status(200).json(properties);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const userProperties = async (req,res) => {
    const userId = req.user._id;

    try {
        const properties = await Properties.find({ ownerId: userId });

        res.status(200).json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const approveProperty = async (req, res) => {
    const { propId } = req.body;
    const userId = req.user._id;
    
    try {
        // Find the user by their ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Only admins can approve properties." });
        }

        const property = await Properties.findById(propId);

        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }

        property.status = true;

        await property.save();

        res.status(200).json({ message: "Property approved successfully" });
    } catch (error) {
        console.error("Error approving property:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteProperty = async (req, res) => {
    const { propId } = req.body;
    const userId = req.user._id;

    try {
        // Find the user by their ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Only admins can delete properties." });
        }

        const property = await Properties.findByIdAndDelete(propId);

        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }

        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addProperty,
    pendingReview,
    approvedProperties,
    userProperties,
    approveProperty,
    deleteProperty
}