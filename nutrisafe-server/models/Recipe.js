const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User     = require("./User");


const recipeSchema = new Schema ({
  recipeName: String,
  ingrediants: Array,
  instructions: String,
  image: String,
  preptime: Number,
  author: {type: Schema.Types.ObjectId},
  // style: {type: String, enum: 'saved, created'}
},
{timestamp: true}
);




const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;