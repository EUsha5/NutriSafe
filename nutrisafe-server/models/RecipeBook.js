const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User     = require("./User");
const Recipe   = require("./Recipe");

const recipebookSchema = new Schema ({
  title: String,
  recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
},
{timestamps: true}
);

const RecipeBook = mongoose.model('RecipeBook', recipebookSchema);

module.exports = RecipeBook;