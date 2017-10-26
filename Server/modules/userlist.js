
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
    }
};