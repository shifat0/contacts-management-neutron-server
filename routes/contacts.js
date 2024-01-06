import express from "express";
import Contact from "../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phoneNumber, address, profilePicture } = req.body;
  const newContact = new Contact({
    name,
    email,
    phoneNumber,
    address,
    profilePicture,
  });

  try {
    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber, address, profilePicture } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, address, profilePicture },
      { new: true }
    );
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    res.json(deletedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
