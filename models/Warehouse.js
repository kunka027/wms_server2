const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country_code: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Number, default: 0}, // 1: allow, 0: deny, 2: full
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    is_deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('warehouse', warehouseSchema);
