const express = require("express");
const router = express.Router();
const doctors = require("../data/doctors");

// GET all doctors
router.get("/", (req, res) => {
  res.json(doctors);
});

// GET a specific doctor by ID
router.get("/:id", (req, res) => {
  const doctor = doctors.find((d) => d.id === parseInt(req.params.id));
  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }
  res.json(doctor);
});

// GET doctors by specialty
router.get("/specialty/:specialty", (req, res) => {
  const specialtyDoctors = doctors.filter((d) =>
    d.specialty.toLowerCase().includes(req.params.specialty.toLowerCase())
  );
  res.json(specialtyDoctors);
});

// GET doctors by consultation type
router.get("/consultation/:type", (req, res) => {
  const typeDoctors = doctors.filter(
    (d) => d.consultationType.toLowerCase() === req.params.type.toLowerCase()
  );
  res.json(typeDoctors);
});

module.exports = router;
