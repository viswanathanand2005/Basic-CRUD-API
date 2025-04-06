import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter the name here:"],
    },
    quantity: {
      type: Number,
      required: [true, "Enter the quantity here: "],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Enter the quantity here: "],
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, //Allows to add two more extra fields 'Create and add', 'Update and add'
  }
);
const Product = mongoose.model('Product',ProductSchema)
export default Product