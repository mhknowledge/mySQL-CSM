use employee_db;
INSERT INTO department(department_name) VALUES 
INSERT INTO roles(title, salary, department_id) VALUES ('IT Director', 120000, 1), ('App Manager', 80000, 1), ('App Admin', 65000, 2), ('App Developer', 75000, 2), ('App Analyst', 55000, 3), ('Senior Software Developer', 90000, 3), ('Office Assistant', 63000, 4), ('Junior Software Developer', 75000, 4);
INSERT INTO employee(first_name, last_name, roles_id, manager_id) VALUES ('Kobe', 'Bryant', 1, null), ('Micahel', 'Jordan', 2, 1), ('Pete', 'Marovich', 3, 4), ('Phil', 'Jackson', 4, null);
