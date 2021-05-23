const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config()
const connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.DB_NAME,
    }
);
connection.connect((err) => {
    if(err) throw err;
    findFunc();

});

function findFunc() {
    inquirer.prompt(
        [
            {
                name: 'action',
                type: 'rawlist',
                message: 'Please select a task: ',
                choices: [
                    'Show Departments',
                    'Show Employees',
                    'Show Employee Roles',
                    'Show Employees by Department',
                    'Show Employees by Manager',
                    'Create a New Employee',
                    'Delete an Existing Employee',
                    'Leave',
                ],
            }
        ]
    ).then((answers) => {
        console.log(answers)
        if(answers.action === 'Leave'){
            connection.end()
            return
        }if (answers.action === 'Show Departments'){
            showDepartments()
        }else if (answers.action === 'Show Employees'){
            showEmployees()
        }if (answers.action === 'Show Employee Roles'){
            showRoles()
        }else if (answers.action === 'Show Employees by Department'){
            employeeByDept()
        }else if(answers.action === 'Show Employees by Manager'){
            showByManager()
        }else if(answers.action === 'Create a New Employee'){
            createEmployee()
        }else if (answers.action === 'Delete an Existing Employee'){
            deleteEmployee()
        }
    });
};
function showDepartments() {
    connection.query('SELECT * FROM department', (err, res) =>{
        if (err) throw err;
        console.table(res);
        findFunc();
    });
};
function showEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        findFunc();
    });
};
function showRoles() {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.table(res);
        findFunc();
    });
};
function employeeByDept() {
    let query = 'SELECT first_name, last_name, title, salary FROM employee LEFT JOIN roles ON employee.id = roles.id';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    findFunc();
});
};

function showByManager() {
    let query = 'SELECT e.first_name as \'First\', e.last_name, e.manager_id, m.first_name as \'Manager First Name\', m.last_name as \'Manager Last Name\' FROM employee e LEFT JOIN employee m ON e.manager_id = m.id';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    findFunc();
    });    
};

const createEmployee = () => {
    let inquiries = [
      {
        type: 'input',
        name: "first_name",
        message: "Please enter a first name: "
      },
      {
        type: 'input',
        name: "last_name",
        message: "Please enter a  last name: "
      },
      {
        type: 'number',
        name: "roles_id",
        message: "Please enter a role: "
      },
      {
        type: 'number',
        name: "manager_id",
        message: "Please provide a manager id: "
      }
    ]
  
    inquirer.prompt(inquiries)
    .then((answers) => {
  
      connection.query(
        'INSERT INTO employee SET ?',
        answers,
        (err, res) => {
          if (err) throw err;
          console.log(`Employee added!\n`);
          // Call readProducts AFTER the DELETE completes
          findFunc();
        }
      );
    })
  }

  const deleteEmployee = () => {

    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table(res);
      inquirer.prompt(
        [
          {
            name: 'employee_id',
            type: 'number',
            message: 'What is the employee id: ',
          }
        ]
      ).then((answers) => {
        console.log('Deleting employee...\n');
        connection.query(
          'DELETE FROM employee WHERE ?',
          {
            id: answers.employee_id
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee deleted!\n`);
            // Call readProducts AFTER the DELETE completes
            findFunc();
          }
        );  
      })
    });  
  } 