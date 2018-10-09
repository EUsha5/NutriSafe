const mongoose   = require("mongoose");
const Schema     = mongoose.Schema;
const RecipeBook = require("./RecipeBook");


const userSchema = new Schema ({
  username: {
    type: String, 
    required: [true]
  },
  password: {
    type: String, 
    required: [true]
  },
  firstName: {
    type: String,
    required: [true]
  },
  lastName: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [true],
  },
  recipebook: [{type: Schema.Types.ObjectId, ref: 'RecipeBook'}],
},
{timestamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;