import mongoose from "mongoose";

const singleItemSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true}, 
    description: {type: String}, 
    currency: {type: String, default: "$"},
    price: {type: String, required: true},
    isPromoted: {type: Boolean, default: false},
    promotion: {type: String},
    imageUrl: {type: String, required: true},
    discountPercentage: {type: String},
    brand: {type: String},
    category: {type: String, required: true},
    quantity: {type: Number || String, required: true},
});

const SingleItemSchema = mongoose.model('SingleItemSchema', singleItemSchema);

export default SingleItemSchema;