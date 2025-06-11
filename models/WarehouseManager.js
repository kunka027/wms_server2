const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    worker: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WarehouseWorker' }],
    warehouse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('warehouseManager', managerSchema);
