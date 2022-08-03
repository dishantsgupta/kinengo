const conn = require("../../config/db.config");



const adminModal = function (admin) {
    this.code = admin.code;
    this.name = admin.name;
    this.state_id = admin.state_id;
    this.country_id = admin.country_id;
};



adminModal.showCountry = (result) => {
    conn.query(`SELECT code, name FROM country_master`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
}

adminModal.addCountry = (code, name, result) => {
    conn.query(`INSERT INTO country_master(code, name) VALUES(?, ?)`, [code, name], (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};

adminModal.updateCountry = (code, name, id, result) => {
    conn.query(`UPDATE country_master SET code = '${code}', name = '${name}' WHERE id = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};

adminModal.deleteCountry = (id, result) => {
    conn.query(`DELETE FROM country_master WHERE id = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};

adminModal.showState = (result) => {
    conn.query(`SELECT name FROM state_master`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
}

adminModal.addState = (name, country_id, result) => {
    conn.query(`INSERT INTO state_master(name, country_id) VALUES(?, ?)`, [name, country_id], (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};

adminModal.updateState = (name, country_id, id, result) => {
    conn.query(`UPDATE state_master SET name = '${name}', country_id = ${country_id} WHERE id = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};

adminModal.deleteState = (id, result) => {
    conn.query(`DELETE FROM state_master WHERE id = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};

adminModal.showCity = (result) => {
    conn.query(`SELECT name FROM city_master`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
}

adminModal.addCity = (name, country_id, state_id, result) => {
    conn.query(`INSERT INTO city_master(name, country_id, state_id) VALUES(?, ?, ?)`, [name, country_id, state_id], (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};

adminModal.updateCity = (name, country_id, state_id, id, result) => {
    conn.query(`UPDATE city_master SET name = '${name}', country_id = ${country_id}, state_id = ${state_id} WHERE id = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};

adminModal.deleteCity = (id, result) => {
    conn.query(`DELETE FROM city_master WHERE id = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            result(null, results);
        }
    });
};



module.exports = adminModal;