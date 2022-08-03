const AdminModal = require("../models/admin.model");
const Cryptr = require("cryptr"),
cryptr = new Cryptr('qwe1234');
const { upperCase } = require("upper-case");




const showCountryCon = (req, res) => {
    AdminModal.showCountry((err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `All countries`,
                data: result,
            });
        }
    });
};


const addCountryCon = (req, res) => {
    req.body.code = upperCase(req.body.code);
    req.body.name = upperCase(req.body.name);
    AdminModal.addCountry(req.body.code, req.body.name, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `Country add successfully.`,
            });
        }
    });
};


const updateCountryCon = (req, res) => {
    req.body.code = upperCase(req.body.code);
    req.body.name = upperCase(req.body.name);
    AdminModal.updateCountry(req.body.code, req.body.name, req.params.id, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `Country updated successfully.`,
            });
        }
    });
};


const deleteCountryCon = (req, res) => {
    AdminModal.deleteCountry(req.params.id, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `Country deleted successfully.`,
            });
        }
    });
};


const showStateCon = (req, res) => {
    AdminModal.showState((err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `All states`,
                data: result,
            });
        }
    });
};


const addStateCon = (req, res) => {
    req.body.name = upperCase(req.body.name);
    AdminModal.addState(req.body.name, req.body.country_id, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `State add successfully.`,
            });
        }
    });
};


const updateStateCon = (req, res) => {
    req.body.name = upperCase(req.body.name);
    AdminModal.updateState(req.body.name, req.body.country_id, req.params.id, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `State updated successfully.`,
            });
        }
    });
};


const deleteStateCon = (req, res) => {
    AdminModal.deleteState(req.params.id, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `State deleted successfully.`,
            });
        }
    });
};


const showCityCon = (req, res) => {
    AdminModal.showCity((err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `All cities`,
                data: result,
            });
        }
    });
};


const addCityCon = (req, res) => {
    req.body.name = upperCase(req.body.name);
    AdminModal.addCity(req.body.name, req.body.country_id, req.body.state_id, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `City add successfully.`,
            });
        }
    });
};


const updateCityCon = (req, res) => {
    req.body.name = upperCase(req.body.name);
    AdminModal.updateCity(req.body.name, req.body.country_id, req.body.state_id, req.params.id, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `City updated successfully.`,
            });
        }
    });
};


const deleteCityCon = (req, res) => {
    AdminModal.deleteCity(req.params.id, (err, result) => {
        if(err) {
            res.json({
                status: 405,
                success: false,
                message: err.sqlMessage,
            });
        }
        else{
            res.json({
                status: 200,
                success: true,
                message: `City deleted successfully.`,
            });
        }
    });
};



module.exports = {
    showCountryCon,
    addCountryCon,
    updateCountryCon,
    deleteCountryCon,
    showStateCon,
    addStateCon,
    updateStateCon,
    deleteStateCon,
    showCityCon,
    addCityCon,
    updateCityCon,
    deleteCityCon,
}