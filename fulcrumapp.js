//application should allow users to:
//View departments, roles, employees
//Add departments, roles, employees
//Update employee roles

//note - for testing, will have a schema (which creates the db, table and columns) and a seed (which creates the )

//need to use any transactions?

//consider using id to search for and delete things since it is given in the table

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

  // Your password
  password: "",

  //Your db
  //schema/seed in schema folder
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
       "Update employee role", 
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

        case "Update employee role":
        updateEmplRole();
        break;

        case "Remove an employee":
        removeEmpl();
        break;
      }

    });
}


function viewEmplAll () {

  console.log(`viewEmplAll function run`);

  //select statement
  var query = "select employee.id, employee.first_name, employee.last_name, appointment.title, department.dept as 'department', appointment.salary, ifnull(concat(m.first_name, ' ', m.last_name), 'none') as 'manager' " ;
  
  //plus from statement that inclues join
  query += "from employee inner join appointment on (employee.appt_id = appointment.id) ";

  //join department by department id and foreign key in appointment table
  query += "inner join department on appointment.department_id = department.id "; 

  query += "left join employee as m on employee.manager_id = m.id "
  
  query += "order by first_name asc";

    connection.query(query, function(err, res){
      if (err) throw err;

        //set variable to hold response from query
        let alldata = [];

        //loop through response and push all to alldata var
        for (var i = 0; i < res.length; i++) {
          alldata.push(res[i])
        }

        //display all data as table
        console.table( alldata );

      //ask if user would like to take another action in db
      contAction();

    });

}

function viewEmplByDept () {
  //connect to db and pull back all tables
  //SELECT * FROM [table]

  console.log(`viewRoles function run`);



  
}


function addEmpl () {

  //create variables that hold queries for the employee and appointment tables
  let queryEmpl = "SELECT employee.id, employee.first_name, employee.last_name,concat(employee.first_name, ' ', employee.last_name) 'fullname', employee.appt_id from employee order by employee.first_name asc";

  let queryAppt = "SELECT appointment.title, appointment.id from appointment order by appointment.title asc"

  //create variables that will hold the responses of those queries
  let queryEmplRes = [];
  let queryApptRes = [];

  //create a promise that will return query data from both tables then apply to inquirer prompts
  new Promise ((resolve, reject) => {
    connection.query(queryEmpl, function(err, res){
      if (err) { reject(err);
      } else { resolve(res);

        queryEmplRes = res;

        console.log(queryEmplRes);
      }
    });
    
  }).then(data => {
    connection.query(queryAppt, function(err, res){
      if (err) { throw err };

      queryApptRes = res;

    });

  }).then (data => {


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
        type: "list",
        name: "apptEntry",
        message: "Enter employee's role:",
        choices: () => {
          let apptList = [];
          for (let i = 0; i < queryApptRes.length; i++) {
            apptList.push(queryApptRes[i].title);
          }
          console.log(apptList);
          return apptList;
        }
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: () => {
          let managerList = ['none'];
          for (let i = 0; i < queryEmplRes.length; i++) {
            managerList.push(queryEmplRes[i].fullname);
          }
          // console.log(employeesList)
          return managerList;
        }
      }
    ])

    .then(function(answer) {

      let managerID = "";

      for (let i = 0; i < queryEmplRes.length; i++) {
        if (answer.manager === queryEmplRes[i].fullname) {
            managerID = queryEmplRes[i].id;
        }
      }

      let apptID = "";

      for (let i = 0; i < queryApptRes.length; i++) {
          if (answer.apptEntry === queryApptRes[i].title) {
              apptID = queryApptRes[i].id;
          }
      }

      //connect to sql database and insert the following values that represent a new employee
      //empl id will auto increment in database, no need to define here
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          appt_id: apptID,
          manager_id: managerID
        },

          function(err, res) {
          if (err) throw err;

          console.log("added!");
          // ask if user would like to take another action in db
          contAction();
          
          }
      );
  
    });

  }).catch(err => {

    console.log(err);

  });
  

}


function updateEmplRole () {

  console.log(`updateEmpl function run`);

  let query = "SELECT employee.first_name, employee.last_name,concat(employee.first_name, ' ', employee.last_name) 'fullname', employee.appt_id, appointment.title, appointment.id "

  query += "from employee inner join appointment on (employee.appt_id = appointment.id) order by employee.first_name asc";

  connection.query(query, function(err, res){
    if (err) throw err;

    // console.log(res)

    inquirer
      .prompt([
        {
          name: "emplupdate",
          type: "list",
          message: "Select employee to update",
          choices: () => {
            let employeesList = [];
            for (let i = 0; i < res.length; i++) {
              employeesList.push(res[i].first_name + ' ' + res[i].last_name);
            }
            // console.log(employeesList)
            return employeesList;
          }
        },
        {
          name: "apptupdate",
          type: "list",
          message: "Enter new appointment:",
          choices: () => {
            let apptList = [];
            for (let i = 0; i < res.length; i++) {
              apptList.push(res[i].title);
            }
            console.log(apptList);
            return apptList;
          }
        }
      ])

      .then(function(answer) {

        // console.log(answer);
        console.log(res);

        let resFirstname = "";
        let resLastname = "";
        // let newApptID = "";

        for (let i = 0; i < res.length; i++) {
            if (answer.emplupdate === res[i].fullname) {
              resFirstname = res[i].first_name;
              resLastname = res[i].last_name;
              // newApptID = res[i].id
              // newApptID.push(res[i].a)
            }
            if (answer.apptupdate === res[i].id) {

            }

        }

        console.log(resFirstname);
        console.log(resLastname);
  

          // ask if user would like to take another action in db
          contAction();
      // });

    });

 });

}

function removeEmpl() {
  
  console.log(`removeEmpl function run`);

  let query = "SELECT employee.first_name, employee.last_name, concat(employee.first_name, ' ', employee.last_name) 'fullname', employee.id FROM employee order by employee.first_name asc"
  
  connection.query(query, function(err, res){
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "list",
          name: "emplremove",
          message: "Select employee to be removed",
          choices: () => {
              let employeesList = [];
              for (let i = 0; i < res.length; i++) {
                employeesList.push(res[i].fullname);
              }
              console.log(employeesList)
              return employeesList;
          }
        }

      ])

    .then(function(answer) {

      let idToDelete = "";

      for (let i = 0; i < res.length; i++) {
        if (answer.emplremove === res[i].fullname) {
          idToDelete = res[i].id;
        }
      }

      connection.query(
        "DELETE FROM employee WHERE ?",
        {
          id: idToDelete,
        },

        function(err, res) {
          if (err) throw err;

          console.log("removed!");
          // ask if user would like to take another action in db
          contAction();
        }

      );
      
    });

    //end connection query
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