const con = require('../database/mysql').con;
const mysql = require('mysql');

const UPDATE_EMPLOYEE =
    "UPDATE EMPLOYEE " +
    "SET Is_Allowed = ? " +
    "WHERE Employee_Id = ?; ";

module.exports = {
    employees: {},

    join: function (employee) {
        if (this.employees[employee.employeeId]) {
            return false;
        } else {
            this.employees[employee.employeeId] = employee;
            return true;
        }
    },

    leave: function (employeeId) {
        if (this.employees[employeeId]) {
            delete this.employees[employeeId];
        }
    },

    updateEmployee: function(employeeId, isAllowed, callback) {
        con.query(mysql.format(UPDATE_EMPLOYEE, [isAllowed, employeeId]), function(err, results) {
            callback(results, err);
        });
    }
};