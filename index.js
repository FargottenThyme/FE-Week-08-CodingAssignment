// Menu App Project: Employee Data
// The first class is an Employee.
class Employee {
    constructor(position, firstName, lastName) {
        this.name = firstName + " " + lastName
        this.position = position
    }

    introduce() { // The introduction is dependent on the position of the Employee.
        if(this.position === "Manager") {
            return `Hello, my name is ${this.name}. I am a Manager.`
        } else if(this.position === "Assistant Manager") {
            return `Hello, my name is ${this.name}. I am an ${this.position}.`
        } else {
            return `Hello, my name is ${this.name}. I am a ${this.position}r.`
        }
    }
}
// The second (higher) class is Department.
class Department {
    constructor(departmentName) {
        this.departmentName = departmentName
        this.employees = [] // The array of employees staffed is created.
    }

    addEmployee(employee) { // This adds an employee to the array, if the Employee is valid.
        if (employee instanceof Employee) {
            this.employees.push(employee)
        } else {
            throw new Error(`You must use an instance of Employee. The entered "${employee}" is not an instance of Employee`)
        }
    }

    describe() {
        return `The ${this.departmentName} has a total of ${this.employees.length} employees staffed.`
    }
}
// The core functionality of the Menu application.
class MenuApp {
    constructor() {
        this.departments = [] // This creates a departments array for which to store added Departments.
        this.selectedDepartment = null; // Like in the videos, a selected department is used to provide focus.
    }
    // This provides a background switch for the initial functions of the application.
    start() {
        let selected = this.showMainOptions();
        while (selected != 0) {
            switch(selected) {
                case '1':
                    this.viewDepartment();
                    break;
                case '2':
                    this.createDepartment();
                    break;
                case '3':
                    this.deleteDepartment();
                    break;
                case '4':
                    this.showAllDepartments();
                    break;
                default:
                    selected = 0;
            }
        selected = this.showMainOptions();
        }
        alert("Exiting Menu");
    }
    // This provides a visual aide to the user, listing the available options.
    showMainOptions() {
        return prompt(`
            -0- Exit Menu
            -1- View a Department
            -2- Create a new Department
            -3- Remove a Department
            -4- View all current Departments
        `);
    }
    // This shows the options for the Department sub menu.
    showDepartmentOptions(DepartmentInfo) {
        return prompt(`
            -0- Return to Main
            -1- Add an Employee
            -2- Remove an Employee
            ========================
            ${DepartmentInfo}
        `);
    }
    // This option shows the user all current departments.
    showAllDepartments() {
        let departmentList = '';
        for (let i = 0; i < this.departments.length; i++) {
            departmentList += i + '. ' + this.departments[i].departmentName + '\n';
        }
        alert(departmentList);
    }
    // This prompts the user to select a department, then shows the available options and information within.
    viewDepartment() {
        let index = prompt(`Enter the number of the Department you would like to view.`);
        if (index > -1 && index < this.departments.length) {
            this.selectedDepartment = this.departments[index];
            let description = 'Department Name: ' + this.selectedDepartment.departmentName + '\n';

            for (let i = 0; i < this.selectedDepartment.employees.length; i++) {
                description += i + '. ' + this.selectedDepartment.employees[i].position
                + ': ' + this.selectedDepartment.employees[i].name + '\n';
            }

            let selection = this.showDepartmentOptions(description);
            switch (selection) {
                case '1':
                    this.addEmployee();
                    break;
                case '2':
                    this.removeEmployee();
            }
        }
    }
    // This adds a department to the departments array.
    createDepartment() {
        let departmentName = prompt("Enter the name of the new Department. Please capitalize the first letter(s).");
        this.departments.push(new Department(departmentName));
    }
    // This removes a department from the departments array.
    deleteDepartment() {
        let index = prompt(`Enter the number of the Department you would like to delete:`);
        if (index > -1 && index < this.departments.length) {
            this.departments.splice(index, 1);
        }
    }
    // This adds an employee to the employees array within the selected department.
    addEmployee() {
        let firstName = prompt(`Please enter the employee's first name:`);
        let lastName = prompt(`Please enter the employee's last name:`);
        let position = prompt(`Please enter the intended position of the employee:`);
        this.selectedDepartment.employees.push(new Employee(position, firstName, lastName));
    }
    // This removes an employee from the employees array within the selected department.
    removeEmployee() {
        let index = prompt(`Please enter the number of the employee you would like to remove:`);
        if (index > -1 && index < this.selectedDepartment.employees.length) {
            this.selectedDepartment.employees.splice(index, 1);
        }
    }


}
// This starts the application.
let menu = new MenuApp();
menu.start();