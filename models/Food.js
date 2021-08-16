const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  foodCategory: {
    type: String,
    required: [true, 'Please add Food Category'],
    enum: [
      'Bakery',
      'Biscuits',
      'Breakfast',
      'Desserts',
      'Drinks',
      'Fruit',
      'Meat and Fish',
      'Pasta',
      'Potatoes',
      'Rice',
      'Sauces',
      'Snacks',
      'Soup',
      'Vegetables and Pulses'
    ]
  },
  foodName: {
    type: String,
    required: [true, 'Please add the name of the food'],
    unique: true,
  },
  weightUnit: {
    type: String,
    required: [true, 'Please add the weight unit of the food (ie Grams)'],
  },
  weight: {
    type: Number,
    required: [true, 'Please add a food weight'],
  },
  carbohydrates: {
    type: Number,
    required: [true, 'Please add carbohydrate values for the weight entered'],
  },
});

module.exports = mongoose.model('Food', FoodSchema);
