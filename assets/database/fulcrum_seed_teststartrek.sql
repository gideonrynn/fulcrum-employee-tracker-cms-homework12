-- Star Trek TNG Test SeedSQL
-- Use this schema for testing purposes only
-- Developer's nerd note: technically the majority of the characters here would qualify as command and there is no "salary" in Star Trek TNG in the tradition sense

USE fulcrum_db;

-- Insert a basic set of employee records
INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Jean Luc", "Picard", 51, none);
INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("William", "Riker", 52, 1);
INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Geordi", "La Forge", 53, 2);
INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Data", "Soong", 54, 1);
INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Beverly", "Crusher", 56, 1);
INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Tasha", "Yar", 55, 7);
INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Worf", "Mogh", 55, 2);
INSERT INTO employee (first_name, last_name, appt_id, manager_id) VALUES ("Deanna", "Troi", 57, 1);

-- Insert a basic set of appointments
INSERT INTO appointment (title, salary, department_id) VALUES ("Captain", 100000, 300);
INSERT INTO appointment (title, salary, department_id) VALUES ("First Officer", 75000, 300);
INSERT INTO appointment (title, salary, department_id) VALUES ("Chief Engineer", 80000, 301);
INSERT INTO appointment (title, salary, department_id) VALUES ("Helmsman", 60000, 305);
INSERT INTO appointment (title, salary, department_id) VALUES ("Tactical Officer", 50000, 303);
INSERT INTO appointment (title, salary, department_id) VALUES ("Chief Medical Officer", 90000, 302);
INSERT INTO appointment (title, salary, department_id) VALUES ("Counselor", 60000, 305);

-- Insert a basic set of departments
INSERT INTO department (dept) VALUES ("Command");
INSERT INTO department (dept) VALUES ("Engineering");
INSERT INTO department (dept) VALUES ("Medical");
INSERT INTO department (dept) VALUES ("Security");
INSERT INTO department (dept) VALUES ("Communications");
INSERT INTO department (dept) VALUES ("Operations");
INSERT INTO department (dept) VALUES ("Science");