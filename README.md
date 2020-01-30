# fulcrum-employee-tracker-cms-homework12
This is a Git Hub repository for the NU Coding Bootcamp Employee Tracker CMS Homework for Week 12.

![fulcrum app screenshot](assets/images/fulcrumapp.jpg)
![fulcrum app gif](assets/images/fulcrumapp.gif)


# Setup

1. Once logged in with [GitHub account](https://github.login/), clone the repo locally using link:

  ```sh
    git clone https://github.com/gideonrynn/fulcrum-employee-tracker-cms-homework12.git
  ```

2. Install dependencies:
```sh
  npm i
```

3. Load fulcrum_schema and update password in fulcrumapp file. Follow prompts for creating file from scratch.

    (Optional) To test with seed file, load fulcrum_seed_optionaltest_st.sql from /assets/database folder and follow instructions. 

4. Run in command line with node fulcrumapp.js


Also see: [Cloning a repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).


# Usage

Fulcrum is a simple CMS app that allows users to track department and employee business data. With information in the app, business managers can easily retrieve an overview of the department, report on the number of employees, and departments, and make informed business decisions for fiscal year end goals.

Application is initiated in the command line. 

Users are able to:

- Add employees, appointments and departments
- Remove employees, appointsments and departments
- Update employee roles
- View a list of all employees and their roles, salaries, and departments


# Technologies

This project was built using:

  - Node
  - [console.table 0.10.0](https://www.npmjs.com/package/console.table)
  - [InquirerJs ^7.0.3](https://www.npmjs.com/package/inquirer/v/0.2.3) - installed from 0.2.3, listed ^7
  - [MySQL 2.17.1](https://www.npmjs.com/package/mysql)
  


# License

This project uses the MIT License. See the full details here: https://choosealicense.com/licenses/mit/ 
