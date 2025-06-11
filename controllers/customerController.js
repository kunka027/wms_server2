const User = require('../models/User');

exports.getCustomer = async (req, res) => {
    const customer = await User.find({$and: [{"role" : 3}, {"isDeleted": false}]});
    res.json(customer);
}
