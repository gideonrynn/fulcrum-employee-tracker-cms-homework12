//application should allow users to:
//View departments, roles, employees
//Add departments, roles, employees
//Update employee roles

//note - for testing, will have a schema (which creates the db, table and columns) and a seed (which creates the )

//need to use any transactions?

const inquirer = require("inquirer");
const mysql = require('mysql');
const consoleTable = require('console.table');
const connectionp = require("./assets/connection/connection.js")
// const fs = require("fs");

// create the connection for mysql db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  // Your password //************replace??
  password: "",

  //starting with my own db for testing
  //update with starter db for other users
  database: ""
});

// connect to server and db, and once connected, run first function
connection.connect(function(err) {

  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);

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

      // based on their answer, run the appropriate function and break processing 
      switch (answer.action) {

        case "View all employees":
        viewEmplAll();
        break;

        case "View all employees by department":
        viewEmplByDept();
        break;

        case "Add an employee": 
        addEmpl();
        break;

        case "Update an employee":
        updateEmplRole();
        break;

        case "Remove an employee":
        removeEmpl();
        break;
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

function viewEmplByDept () {
  //connect to db and pull back all tables
  //SELECT * FROM [table]

  console.log(`viewEmplByDept function run`);

  //ask if user would like to take another action in db
  contAction();

}


function addEmpl () {
  
  console.log(`addEmpl function run`);

  // query the database for manager data
  // connection.query("SELECT * FROM [table] WHERE", function(err,      data) {
  //   if (err) throw err;

  inquirer

    .prompt([
      {
        type: "input",
        name: "firstname",
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
        name: "lastname",
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
        name: "role",
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
        name: "manager",
        message: "Who is the employee's manager?",
        choices: 
        //function here to return data from sql database?
        ["Name"]
      }
    ])

    .then(function(answer) {

      //console.logs
      console.log(answer);
      console.log(`do something with these answers`);

      //ask if user would like to take another action in db
      contAction();

  });

}


function updateEmplRole () {
  console.log(`updateEmpl function run`);

  inquirer
    .prompt([
      {
        type: "input",
        name: "emplname",
        message: "Select employee to update",
        choices: 
        //get list or prompt user for id
        //function here to return data from sql database?
        ["Name1",
        "Name2",
        "Name3"]
      }
    ])

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
    .prompt([
      {
        type: "list",
        name: "type",
        message: "Select employee to be removed",
        choices: 
        //consider pulling from list or asking for unique information. would id work here? may only be for db purposes
        ["Name1", 
         "Name2", 
         "Name3"],
      }
    ])

    .then(function(answer) {

      //console.logs
      console.log()
      console.log(`do something with this answer`);

      //ask if user would like to take another action in db
      contAction();

  });

}


function contAction () {

  inquirer
    .prompt([
      {
        type: "confirm",
        name: "continue",
        message: "Take more action in the database?"
      }
    ])

    .then(function(answer) {

      //if user opts to take another action on the database, run startup prompts again. If not, end the connection
      if (answer.continue === true) {

        action();
        
      } else {

        //end connection and notify user
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


//uncomment to show how console.table will print 
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);