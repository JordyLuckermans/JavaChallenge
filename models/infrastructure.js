const mongoose = require('mongoose');

const infrastructureSchema = mongoose.Schema({
    type: {
        type: String
    }
});

const Infrastructure = module.exports = mongoose.model('infrastructure', infrastructureSchema);

module.exports.getAllInfrastructures = function (callback) {
    Infrastructure.find(callback);
}

module.exports.getInfrastructureById = function (id, callback) {
    Infrastructure.findById(id, callback);
}

module.exports.addInfrastructure = function (newInfrastructure, callback) {
    newInfrastructure.save(callback);
}

module.exports.changeInfrastructure = function (infrastructure, callback) {
    infrastructure.save(callback);
}

