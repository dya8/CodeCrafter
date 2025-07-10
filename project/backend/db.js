// db.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
const DB_URI = "mongodb+srv://diyadileep0806:HGdUmqFPDtrL7J88@hackathon1.aqy5syh.mongodb.net/?retryWrites=true&w=majority&appName=Hackathon1";

mongoose.connect(DB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const familySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, required: true },
  ecoPoints: { type: Number, default: 0 },
  role: { type: String, default: "family" },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  badges: { type: [String], default: [] } // ✅ new badges field
});
const Family = mongoose.model("Family", familySchema);

const collectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: 'collector' },
  available: { type: Boolean, default: true },
  city: { type: String, required: true },  // 🏙️ Collector's assigned city
  assignedArea: {
    address: String,
    city: String,
    state: String,
  },

});
  const Collector = mongoose.model('Collector', collectorSchema);
const pickupRequestSchema = new mongoose.Schema({
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
    required: true
  },

  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collector',
    default: null // Assigned later
  },

  wasteType: {
    type: String,
    enum: ['biowaste', 'ewaste', 'biomedical', 'cloth'],
    required: true
  },

  amountKg: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'assigned', 'picked-up', 'cancelled'],
    default: 'pending'
  },

  requestedAt: {
    type: Date,
    default: Date.now
  },

  pickupDate: {
    type: Date // Optional: to schedule pickup date/time
  }
});

const PickupRequest = mongoose.model('PickupRequest', pickupRequestSchema);
const consumptionSchema = new mongoose.Schema({
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
    required: true,
  },

  month: {
    type: String, // e.g., "July 2025"
    required: true,
  },

  electricityUsageKWh: {
    type: Number,
    required: true,
  },

  waterUsageLiters: {
    type: Number,
    required: true,
  },

  petrolConsumptionLiters: {
    type: Number,
    required: true,
  },

  ecoPointsEarned: {
    type: Number,
    default: 0,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
   pdfUrl: {
    type: String}, 
});

const Consumption = mongoose.model('Consumption', consumptionSchema);
// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
app.post('/api/signup', async (req, res) => {
  const { role, email, password, phone, address, city, state } = req.body;

  try {
    const existing = await Family.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newFamily = new Family({
      role,
      email,
      phone,
      address,
      city,
      state,
      password // You can hash this later
    });

    await newFamily.save();
    res.status(201).json({ message: "Signup successful", user: newFamily });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup error" });
  }
});
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Try to find the user in the Family collection
    let user = await Family.findOne({ email });
    let role = 'family';

    // 2. If not found in Family, check in Collector
    if (!user) {
      user = await Collector.findOne({ email });
      role = 'collector';
    }

    // 3. No user found or password mismatch
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 4. Respond with user info (including name for sidebar)
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || role,
        city: user.city,
        state: user.state,
        address: user.address
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login error' });
  }
});
app.get('/api/family/:id', async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);
    if (!family) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: family._id,
      name: family.name,
      email: family.email,
      password: family.password,
      role: family.role,
      city: family.city,
      state: family.state,
      address: family.address,
      badges: family.badges || [],
      ecoPoints: family.ecoPoints || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});
app.get('/api/collector/:id', async (req, res) => {
  try {
    const collector = await Collector.findById(req.params.id);
    if (!collector) return res.status(404).json({ message: 'Collector not found' });

    res.json({
      id: collector._id,
      name: collector.name,
      email: collector.email,
      phone: collector.phone,
      role: collector.role,
      city: collector.city,
      assignedArea: collector.assignedArea,
      available: collector.available
    });
  } catch (err) {
    console.error('Error fetching collector:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post("/api/pickup-request", async (req, res) => {
  const { familyId, wasteType, amountKg } = req.body;

  if (!familyId || !wasteType || !amountKg) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (parseFloat(amountKg) <= 2) {
    return res.status(400).json({ message: "Minimum 2kg required for pickup request." });
  }

  try {
    // Get family details to find city
    const family = await Family.findById(familyId);
    if (!family) return res.status(404).json({ message: "Family not found" });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Find collectors in same city
    const eligibleCollectors = await Collector.find({ city: family.city });

    let assignedCollector = null;

    for (const collector of eligibleCollectors) {
      const count = await PickupRequest.countDocuments({
        collectorId: collector._id,
        pickupDate: { $gte: todayStart },
      });

      if (count < 5) {
        assignedCollector = collector;
        break;
      }
    }

    const newRequest = new PickupRequest({
      familyId,
      collectorId: assignedCollector ? assignedCollector._id : null,
      wasteType,
      amountKg,
      status: assignedCollector ? "assigned" : "pending",
      pickupDate: new Date(),
    });
    await newRequest.save();

    res.status(201).json({
      message: assignedCollector
        ? "Pickup request submitted and assigned to a collector."
        : "Pickup request submitted and queued (no collector available).",
      request: newRequest,
    });
  } catch (err) {
    console.error("❌ Error handling pickup:", err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/family/:id/requests", async (req, res) => {
  const { id } = req.params;
  const requests = await PickupRequest.find({ familyId: id }).populate("collectorId");
  res.json(requests);
});
app.get("/api/collector/:id/requests", async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await PickupRequest.find({ collectorId:  new mongoose.Types.ObjectId(id), })
      .populate("familyId", "name address")
      .sort({ requestedAt: 1 }); // ✅ Oldest first (FIFO)

    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching collector pickups:", err);
    res.status(500).json({ message: "Server error" });
  }
});







