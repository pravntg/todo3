const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

/* ================= ADD TASK ================= */
router.post("/add", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const task = await Task.create({
      userId: req.userId,
      title,
      description,
      completed: false,
      deleted: false,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("ADD TASK ERROR:", err);
    res.status(500).json({ message: "Add task failed" });
  }
});

/* ================= LIST TASKS ================= */
/*
  IMPORTANT:
  - Return ALL tasks (active + deleted)
  - Frontend will filter
*/
router.get("/list", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= COMPLETE / UNCOMPLETE ================= */
/*
  Toggle instead of forcing true
  This fixes "undo disabled" issue
*/
router.put("/complete/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE (SOFT DELETE) ================= */
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { deleted: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task moved to deleted", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= RESTORE ================= */
router.put("/restore/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { deleted: false, completed: false },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task restored", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
