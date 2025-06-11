const mongoose = require('mongoose');

const wClientSchema = new mongoose.Schema({
    w_client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    w_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' }
});

module.exports = mongoose.model('w_client', wClientSchema);
