const Warehouse = require('../models/Warehouse');
const mongoose = require('mongoose');

exports.getWarehouse = async (req, res) => {
    const warehouse = await Warehouse.find({$and: [{"email" : req.query.email}, {"is_deleted": false}]});
    res.json(warehouse);
}

exports.saveWarehouse = async (req, res) => {
    console.log(req.body);
    try {
        if (!req.body._id){
            const warehouse = new Warehouse({...req.body, created_at: new Date(), updated_at: new Date()});
            await warehouse.save();
            res.send({status: 200, message: "Warehouse added successfully"});
        } else {
            await Warehouse.updateOne({_id: req.body._id}, {$set: { ...req.body }}).then(response => {
                res.send({status: 200, message: "Warehouse modify successfully"})
            });
        }
    } catch (error) {
        console.log(error);
        res.send({status: 500, message: error.message});
    }
}

exports.deleteWarehouse = async (req, res) => {
    const { _id } = req.params;
    try {
        await Warehouse.updateOne({ _id }, { $set: { "is_deleted" : true, "updated_at": new Date() }}).then(response => {
            res.send({status: 200, message: "Warehouse delete successfully"});
        });
    } catch (error) {
        res.send({status: 500, message: error.message});
    }

}
