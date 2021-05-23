DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INT NOT FULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    deparment_name VARCHAR(30) NOT NULL,

);
CREATE TABLE roles (
    id INT NOT FULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    title VARCHAR(30) NOT FULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT FULL,  
    manager_id INT NULL,
    FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE,
);
use employee_db;

INSERT INTO department(deparment_name) VALUES ('tech opertations'), ('management'), ('app development'), ('app support');
INSERT INTO roles(title, salary, department_id) VALUES ('IT Director', 120000, 1), ('App Manager', 80000, 1), ('App Admin', 65000, 2), ('App Developer', 75000, 2), ('App Analyst', 55000, 3), ('Senior Software Developer', 90000, 3), ('Office Assistant', 63000, 4), ('Junior Software Developer', 75000, 4);
INSERT INTO employee(first_name, last_name, roles_id, manager_id) VALUES ('LeBron', 'James', 4, null), ('Kevin', 'Garnett', 4, 4), ('Steph', 'Curry', 2, 1), ('Kyrie', 'Irving', 1, 1), ('Tim', 'Duncan', 6, 1), ('Manu', 'Ginobli', 4, 1), ('Ray', 'Allen', 3, 3), ('Dennis', 'Rodman', 6, 1);

SELECt first_name, last_name, title, salary
FROM employee
INNER JOIN roles ON employee.roles_id = roles.id;

