const express = require('express');
const {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood
} = require('../controllers/foods');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
.route('/')
.get(getFoods)
.post(protect, authorize('admin'), createFood);

router
.route('/:id')
.get(getFood)
.put(protect, authorize('admin'), updateFood)
.delete(protect, authorize('admin'), deleteFood);

module.exports = router;
