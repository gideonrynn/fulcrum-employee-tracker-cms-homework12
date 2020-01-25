-- Drops the fulcrum_db if it exists currently --
DROP DATABASE IF EXISTS fulcrum_db;

-- Create the database fulcrum_db 
CREATE DATABASE fulcrum_db;

-- Specify database fulcrum_db for use
USE fulcrum_db;

-- Create the table department and set the autoincrement value to 300
CREATE TABLE department (
id integer not null auto_increment,
dept varchar(30) not null,
PRIMARY KEY(id)
) auto_increment=300;

-- Create the table appointment to track role and salary, and set autoincrement value to 50
-- department_id is a foreign key; if a department is deleted, delete appointments attached to the department as well
CREATE TABLE appointment (
id integer not null auto_increment,
title varchar(30) not null,
salary decimal not null,
department_id integer,
PRIMARY KEY(id),
FOREIGN KEY (department_id) REFERENCES department(id) on delete cascade
) auto_increment=50;

-- Create the table employees that will hold the name, appointment (role), and manager (optional)
-- Manager is the only value that is not required
-- appt_id and manager_id are foreign keys; when an appointment or manager is deleted, the values will be set to null
CREATE TABLE employee (
  id integer not null auto_increment primary key,
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  appt_id integer,
  manager_id integer,
  FOREIGN KEY (appt_id) REFERENCES appointment(id) on delete set null,
  FOREIGN KEY (manager_id) REFERENCES employee(id) on delete set null
);





