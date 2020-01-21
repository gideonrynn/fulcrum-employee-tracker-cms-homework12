//application should allow users to:
//View departments, roles, employees
//Add departments, roles, employees
//Update employee roles

const inquirer = require("inquirer");
const mysql = require('mysql');
const consoleTable = require('console.table');
// const fs = require("fs");


// create the connection for mysql db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  // Your password //************replace??
  password: "NUBC01root!",

  //starting with my own db for testing
  //update with starter db for other users
  database: ""
});

// connect to server and db
connection.connect(function(err) {
  if (err) throw err;

  //run function that will ask the user what they want to do in the database
  action();

});
  
//runs at startup to prompt user what they would like to do next
function action() {

  inquirer
    .prompt({

      type: "list",
      name: "action",
      message: "What would you like to do first?",
      choices: 
      ["View all employees", 
       "Add an employee",
       "Update an employee", 
       "Remove an employee"]

    })

      .then(function(answer) {

      // based on their answer, run the appropriate function

      if (answer.action === "View all employees") {
        viewEmplAll();
      }

      if (answer.action === "Add an employee") {
        addEmpl();
      }

      if (answer.action === "Update an employee") {
        updateEmplRole();
      } 

      if (answer.action === "Remove an employee") {
        removeEmpl();
      }

    });

}


function viewEmplAll () {
  //connect to db and pull back all tables
  //SELECT * FROM [table]

  console.log(`viewEmplAll function run`);

  //ask if user would like to take another action in db
  contAction();

}


function addEmpl () {
  
  console.log(`addEmpl function run`);

  // query the database for manager data
  // connection.query("SELECT * FROM [table] WHERE", function(err,      data) {
  //   if (err) throw err;

  inquirer

    .prompt({
      type: "input",
      name: "name",
      message: "Enter employee's first name:",
      
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
      //function here to return data from sql database?
      ["Name"]
    })

    .then(function(answer) {

      console.log(`do something with these answers`)

  });

  //ask if user would like to take another action in db
  contAction();

}


function updateEmplRole () {
  console.log(`updateEmpl function run`);

  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter employee's first name:",
      choices: 
      //get list or prompt user for id
      //function here to return data from sql database?
      ["Name"],
      validate: (text) => {
        if (text === "") {
            return "Please enter a name";
        }
        return true;
      }
    })

    .then(function(answer) {

      //INSERT into database
      console.log(`do something with this answer`)

      //ask if user would like to take another action in db
      contAction();

  });

}

function removeEmpl() {
  console.log(`removeEmpl function run`);

  inquirer
    .prompt({
        type: "list",
        name: "type",
        message: "Which employee should be removed?",
        choices: 
        //consider pulling from list or asking for unique information. would id work here? may only be for db purposes
        ["Name", 
         "Name", 
         "Name"],
    })

    .then(function(answer) {

      //insert into database
      console.log(`do something with this answer`);

      //ask if user would like to take another action in db
      contAction();

  });

}


function contAction () {

  inquirer
    .prompt({
      
        type: "confirm",
        name: "continue",
        message: "Take more action in the database?"
      
    })

    .then(function(answer) {

      console.log(`do something with this answer`)

      //if user opts to take another action on the database, run startup prompts again. If not, end the connection
      if (answer.continue === true) {

        action();
        
        } else {

          connection.end();
          console.log(`connection to database closed!`)
        }

  });

}


//inquirer when questions are a variable. not using for this app
// inquirer.prompt(questions)
//   .then((answers) => {
// });

//can be used within an inquirer question object when a question should only be asked based on certain information within the current prompts
// when: (answers) => answers.type === 'Add an employee'