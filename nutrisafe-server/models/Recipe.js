const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const recipeSchema = new Schema ({
  recipeName: String,
  ingrediants: Array,
  instructions: String,
  preptime: Number,
  image: String
},
{timestamp: true}
);




const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;