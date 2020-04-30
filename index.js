const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

const questions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"

        },
        {
            type: "input",
            name: "projectTitle",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Please write a short description of you project."
        },
        {
            type: "input",
            name: "license",
            message: "What license would you like to use?"
        },
        {
            type: "input",
            name: "dependencies",
            message: "What command needs to be run for dependencies?"
        },
        {
            type: "input",
            name: "test",
            message: "Would you like to run any test commands?"
        },
        {
            type: "input",
            name: "needToKnow",
            message: "Is there any other need to know information?"
        },
        {
            type: "input",
            name: "contribute",
            message: "Would you like the user to have any information about contributing?"
        }
    ]);
}