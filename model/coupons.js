const mongoose = require('mongoose');
const {Schema} = mongoose;

const couponsSchema = new Schema({
    shop: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    discountCreated: { type: Boolean },
    discountPaused: { type: Boolean },
    discountType: { type: String },
    discountAmount: { type: Number, min: 0, max: 999 },
    discountEndType: {type: String },
    discountEndDate: { type: Date, default: Date.now },
    discountEndQty: {type: Number},
    discountTitle: {type: String },
    discountParagraph: { type: String },
    discountCodes: [{ type: String }],
    discountCodesSent: [{ type: String }],
    priceRule: { type: String }
});

module.exports = mongoose.model('Coupons', couponsSchema);