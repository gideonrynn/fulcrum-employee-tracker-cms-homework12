//application should allow users to:
//View departments, roles, employees
//Add departments, roles, employees
//Update employee roles

const inquirer = require("inquirer");
const fs = require("fs");

//create variable that will contain list of questions for user to buid team
//uses validation to ensure no blank entries
const questions = [
    {
      type: "list",
      name: "type",
      message: "What would you like to do first?",
      choices: 
      ["View all employees", 
       "Add an employee", 
       "Remove an employee"]
    },
    {
      type: "input",
      name: "name",
      message: "Enter employee's first name:",
      when: (answers) => answers.type === 'Add an employee',
      validate: (text) => {
        if (text === "") {
            return "Please enter a name";
        }
        return true;
      }
    },
    {
      type: "input",
      name: "name",
      message: "Enter employee's last name:",
      when: (answers) => answers.type === 'Add an employee',
      validate: (text) => {
        if (text === "") {
            return "Please enter a name";
        }
        return true;
      }
    },
    {
      type: "input",
      name: "name",
      message: "Enter employee's role:",
      when: (answers) => answers.type === 'Add an employee',
      validate: (text) => {
        if (text === "") {
            return "Please enter a name";
        }
        return true;
      }
    },
    {
    type: "list",
    name: "type",
    message: "Who is the employee's manager?",
    choices: 
    ["Name", 
     "Name", 
     "Name"],
     when: (answers) => answers.type === 'Add an employee',
  },
    {
      type: "list",
      name: "type",
      message: "Which employee should be removed?",
      choices: 
      ["Name", 
       "Name", 
       "Name"],
       when: (answers) => answers.type === 'Remove an employee',
    },
    {
      type: "confirm",
      name: "continue",
      message: "Take more action in the database?"
    }
  ];
  