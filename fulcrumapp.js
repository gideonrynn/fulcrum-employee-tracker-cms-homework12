const inquirer = require("inquirer");
const mysql = require('mysql');
const consoleTable = require('console.table');


// create the connection for mysql db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  // Your password
  password: "",

  //use default fulcrum_db
  database: "fulcrum_db"

  //**Seed for fulcrum_db
  //fulcrum_db will run *without* seed database. Follow prompts to add departments, appointments and employees
  //Optional may use fulcrum_seed_teststartrek to test application with database records

});

// connect to server and db, and once connected, run first function
connection.connect(function(err) {

  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId + ". Welcome to the Fulcrum app.");



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
      "Add an appointment",
      "Add a department",
       "Update employee role", 
       "Remove an employee",
       "Remove an appointment",
       "Remove a department"
    ]

    })

      .then(function(answer) {

      // based on their answer, run the appropriate function and break processing 
      switch (answer.action) {

        case "View all employees":
        viewEmplAll();
        break;

        case "View all departments":
        viewDept();
        break;

        case "Update employee role":
        updateEmplRole();
        break;

        case "Remove an employee":
        removeEmpl();
        break;

        case "Remove an appointment":
        removeAppt();
        break;

        case "Remove a department":
        removeDept();
        break

        case "Add an employee": 
        addEmpl();
        break;

        case "Add a department":
        addDept();
        break;

        case "Add an appointment":
        addAppt();
        break;
      }

    });
}


function viewEmplAll () {

  //select statement
  var query = "select employee.id, employee.first_name, employee.last_name, appointment.title, department.dept as 'department', appointment.salary, ifnull(concat(m.first_name, ' ', m.last_name), 'none') as 'manager' " ;
  
  //add from statement that inclues join
  query += "from employee inner join appointment on (employee.appt_id = appointment.id) ";

  //add join department by department id and foreign key in appointment table
  query += "inner join department on appointment.department_id = department.id "; 

  //add left join only so that employee information will display as manager
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


function addEmpl () {

  //create variables that hold queries for the employee and appointment tables
  let queryEmpl = "SELECT employee.id, employee.first_name, employee.last_name, concat(employee.first_name, ' ', employee.last_name) 'fullname', employee.appt_id from employee order by employee.first_name asc";

  let queryAppt = "SELECT * from appointment order by appointment.title asc"

  //create variables that will hold the responses of those queries
  let queryEmplRes = [];
  let queryApptRes = [];

  //create a promise that will return query data from both tables then apply to inquirer prompts, some of which display data from the database for user selections
  new Promise ((resolve, reject) => {
    connection.query(queryEmpl, function(err, res){
      if (err) { reject(err);
      } else { resolve(res);

        queryEmplRes = res;
      }
    });
    
  }).then( () => {
    connection.query(queryAppt, function(err, res){
      if (err) { throw err };
      queryApptRes = res;

    });

  }).then (() => {
    
    console.log(queryApptRes == "")

    if (queryApptRes == "") {
      console.log("Please 'add a department' and 'add an appointment' before adding employees")
      contAction();

    } else {

    
      //prompt user for data that will ultimately be inserted into the database
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

        //match user input against database response and get manager id (which == employee id)
        //default to none for startup database
        let managerID = null;

        for (let i = 0; i < queryEmplRes.length; i++) {
          if (answer.manager === queryEmplRes[i].fullname && answer.manager !== '') {
              managerID = queryEmplRes[i].id;
          } 
        }

        //match user input against database response and get apptID
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

            console.log("New employee has been added!");

            console.log(queryApptRes)
            // ask if user would like to take another action in db
            contAction();
            
            }
        );
    
      });
    
    }

  }).catch(err => {

    console.log(err);

  });

}



function addAppt () {

  let queryDept = "SELECT department.dept, department.id from department order by department.dept asc"
  
  connection.query(queryDept, function(err, res){
    if (err) throw err;

    if (res == "") {
      console.log("Please 'add a department' before adding appointments")
      contAction();

    } else {

      inquirer
        .prompt([
          {
            type: "input",
            name: "newtitle",
            message: "Enter new appointment title:",
            validate: (text) => {
              if (text === "") {
                return "Please enter an appointment name";
              }
                return true;
            }
          },
          {
            type: "input",
            name: "newsalary",
            message: "Enter salary for this appointment (ex/30000):",
            validate: (num) => {
              if (num === "") {
                  return "Please enter number";
              }
              return true;
            }
          },
          {
            type: "list",
            name: "deptlist",
            message: "Select department in which role resides",
            choices: () => {
                let deptList = [];
                for (let i = 0; i < res.length; i++) {
                  deptList.push(res[i].dept);
                }
                return deptList;
            }
          }

        ])

      .then(function(answer) {

        let deptID = "";

        for (let i = 0; i < res.length; i++) {
          if (answer.deptlist === res[i].dept) {
            deptID = res[i].id;
          }
        }

      //connect to sql database and insert the following name for the department
        //dept id will auto increment in database, no need to define here
        connection.query(
          "INSERT INTO appointment SET ?",
          {
            title: answer.newtitle,
            salary: answer.newsalary,
            department_id: deptID,
          },

            function(err, res) {
            if (err) throw err;

            console.log("New appointment added!");
            // ask if user would like to take another action in db
            contAction();
            
            }
        );
        
      });

    }
    //end connection query
  });

}



function addDept () {

  //prompt user for data that will ultimately be inserted into the database
  inquirer
    .prompt([
      {
        type: "input",
        name: "newdept",
        message: "Enter the new department name:",
        validate: (text) => {
          if (text === "") {
            return "Please enter a department name";
          }
            return true;
        }
      }
    ])

  .then(function(answer) {

    //connect to sql database and insert the following name for the department
    //dept id will auto increment in database, no need to define here
    connection.query(
      "INSERT INTO department SET ?",
      {
        dept: answer.newdept,
      },

        function(err, res) {
        if (err) throw err;

        console.log("New department added!");
        // ask if user would like to take another action in db
        contAction();
        
        }
    );

  });
}


function updateEmplRole () {

  //create variables that hold queries for the employee and appointment tables
  let queryEmpl = "SELECT employee.id, employee.first_name, employee.last_name, concat(employee.first_name, ' ', employee.last_name) 'fullname', employee.appt_id from employee order by employee.first_name asc";

  let queryAppt = "SELECT * from appointment order by appointment.title asc"

  //create variables that will hold the responses of those queries
  let queryEmplRes = [];
  let queryApptRes = [];

  //create a promise that will return query data from both tables then apply to inquirer prompts, some of which display data from the database for user selections
  new Promise ((resolve, reject) => {
    connection.query(queryEmpl, function(err, res){
      if (err) { reject(err);
      } else { resolve(res);

        queryEmplRes = res;

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
            name: "emplupdate",
            type: "list",
            message: "Select employee to update",
            choices: () => {
              let employeesList = [];
              for (let i = 0; i < queryEmplRes.length; i++) {
                employeesList.push(queryEmplRes[i].fullname);
              }
              return employeesList;
            }
          },
          {
            name: "apptupdate",
            type: "list",
            message: "Enter new appointment:",
            choices: () => {
              let apptList = [];
              for (let i = 0; i < queryApptRes.length; i++) {
                apptList.push(queryApptRes[i].title);
              }
              return apptList;
            }
          }
        ])

      .then(function(answer) {

        let emplID = "";

        for (let i = 0; i < queryEmplRes.length; i++) {
          if (answer.emplupdate === queryEmplRes[i].fullname) {
              emplID = queryEmplRes[i].id;
          }
        }
     
        //match user input against database response and get apptID
        let apptID = "";

        for (let i = 0; i < queryApptRes.length; i++) {
          if (answer.apptupdate === queryApptRes[i].title) {
              apptID = queryApptRes[i].id;
          }
        }

        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              appt_id: apptID
            },
            {
              id: emplID
            }
          ],
  
            function(err, res) {
            if (err) throw err;
  
            console.log("update complete!");
            // ask if user would like to take another action in db
            contAction();
            
            }
        );

    });

 });

}

function removeEmpl() {

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

      //connect to sql database and delete the record associated with the below employee id
      connection.query(
        "DELETE FROM employee WHERE ?",
        {
          id: idToDelete,
        },

        function(err, res) {
          if (err) throw err;

          console.log("Employee has been removed!");
          // ask if user would like to take another action in db
          contAction();
        }

      );
      
    });

    //end connection query
  });


}

function removeAppt() {

  let query = "SELECT * FROM appointment order by appointment.title asc"
  
  connection.query(query, function(err, res){
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "confirm",
          name: "decision",
          message: "Deleting an appointment will remove the title from associated employees. You will need to update those employee roles."
        },
        {
          type: "list",
          name: "apptremove",
          message: "Select appointment to be removed",
          choices: () => {
              let apptList = [];
              for (let i = 0; i < res.length; i++) {
                deptList.push(res[i].title);
               
              }
              return apptList;
          },
          when: (answer) => answer.decision === true
        }

      ])

    .then(function(answer) {

      //if the user chooses to continue to deleting the appointment, delete from the database
      if (answer.decision !== false) {
        
        let idToDelete = "";

        for (let i = 0; i < res.length; i++) {
          if (answer.apptremove === res[i].title) {
            idToDelete = res[i].id;
          }
        }

        //connect to sql database and delete the record associated with the below employee id
        connection.query(
          "DELETE FROM appointment WHERE ?",
          {
            id: idToDelete,
          },

          function(err, res) {
            if (err) throw err;

            console.log("Appointment removed!");
            // ask if user would like to take another action in db
            contAction();
          }

        );
          
      } else {
        // ask if user would like to take another action in db
        contAction();
      }

      
    });

    //end connection query
  });


}

function removeDept() {

  let query = "SELECT * FROM department order by department.dept asc"
  
  connection.query(query, function(err, res){
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "confirm",
          name: "decision",
          message: "Deleting a department also deletes the associated role(s). Do you want to continue?"
        },
        {
          type: "list",
          name: "deptremove",
          message: "Select department to be removed",
          choices: () => {
              let deptList = [];
              for (let i = 0; i < res.length; i++) {
                deptList.push(res[i].dept);
               
              }
              return deptList;
          },
          when: (answer) => answer.decision === true
        }

      ])

    .then(function(answer) {

      //if the user chooses to continue to deleting the department, delete from the database
      if (answer.decision !== false) {
        
        let idToDelete = "";

        for (let i = 0; i < res.length; i++) {
          if (answer.deptremove === res[i].dept) {
            idToDelete = res[i].id;
          }
        }

        //connect to sql database and delete the record associated with the below employee id
        connection.query(
          "DELETE FROM department WHERE ?",
          {
            id: idToDelete,
          },

          function(err, res) {
            if (err) throw err;

            console.log("Department removed!");
            // ask if user would like to take another action in db
            contAction();
          }

        );
          
      } else {
        // ask if user would like to take another action in db
        contAction();
      }

      
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
        console.log(`Connection to database closed. Thank you for using the Fulcrum app!`)

      }

  });

}
