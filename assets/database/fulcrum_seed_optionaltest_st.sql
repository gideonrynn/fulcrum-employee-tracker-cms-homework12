-- Star Trek TNG Test SeedSQL
-- Use this schema for testing purposes only
-- Appointment and employee tables below contain foreign keys
-- Developer's nerd note: technically the majority of the characters here would qualify as command and there is no "salary" in Star Trek TNG in the tradition sense

USE fulcrum_db;

-- 1. Create department table
-- uncomment out code and execute script; once complete, comment out again.
-- INSERT INTO department (dept) VALUES ("Command");
-- INSERT INTO department (dept) VALUES ("Engineering");
-- INSERT INTO department (dept) VALUES ("Medical");
-- INSERT INTO department (dept) VALUES ("Security");
-- INSERT INTO department (dept) VALUES ("Communications");
-- INSERT INTO department (dept) VALUES ("Operations");
-- INSERT INTO department (dept) VALUES ("Science");

-- 2. Now that the department table has been created - with the department_id which is referenced in this table - create the appointment table.
-- uncomment out code and execute script; once complete, comment out again.
-- INSERT INTO appointment (title, salary, department_id) VALUES ("Captain", 100000, 300);
-- INSERT INTO appointment (title, salary, department_id) VALUES ("First Officer", 75000, 300);
-- INSERT INTO appointment (title, salary, department_id) VALUES ("Chief Engineer", 80000, 301);
-- INSERT INTO appointment (title, salary, department_id) VALUES ("Helmsman", 60000, 305);
-- INSERT INTO appointment (title, salary, department_id) VALUES ("Tactical Officer", 50000, 303);
-- INSERT INTO appointment (title, salary, department_id) VALUES ("Chief Medical Officer", 90000, 302);
-- INSERT INTO appointment (title, salary, department_id) VALUES ("Counselor", 60000, 305);


-- 3. Now that the appointment table - and the appt_id, which is referenced in this table - has been created, create the appointment table
-- uncomment out code and execute script; once complete, comment out again.
-- INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Jean Luc", "Picard", 50, null);
-- INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("William", "Riker", 51, null);
-- INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Geordi", "La Forge", 52, null);
-- INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Data", "Soong", 53, null);
-- INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Beverly", "Crusher", 55, null);
-- INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Tasha", "Yar", 54, null);
-- INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Worf", "Mogh", 54, null);
-- INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Deanna", "Troi", 56, null);

-- 4. Now that the employee table - with the employee ids - use those employee ids to set managers
-- uncomment out code and execute script; once complete, comment out again.
-- UPDATE employee SET manager_id = 1 WHERE first_name = "William";
-- UPDATE employee SET manager_id = 2 WHERE first_name = "Geordi";
-- UPDATE employee SET manager_id = 1 WHERE first_name = "Data";
-- UPDATE employee SET manager_id = 1 WHERE first_name = "Beverly";
-- UPDATE employee SET manager_id = 7 WHERE first_name = "Tasha";
-- UPDATE employee SET manager_id = 2 WHERE first_name = "Worf";
-- UPDATE employee SET manager_id = 1 WHERE first_name = "Deanna";

SELECT * FROM fulcrum_db.appointment;
SELECT * FROM fulcrum_db.department;
SELECT * FROM fulcrum_db.employee;
