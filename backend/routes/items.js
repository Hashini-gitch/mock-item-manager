const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// CREATE item
router.post("/", async (req, res) => {
  try {
    const item = new Item({
      itemName: req.body.itemName,
      price: req.body.price,
      brand: req.body.brand,
    });

    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.log("Create item error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// READ all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid item ID" });
  }
});

module.exports = router;
