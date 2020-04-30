const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);;

const questions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "userName",
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
};

const generateReadMe = (answers) => {
    return `
    # Hello Welcome to ${answers.projectTitle}
        ${answers.description}

        

        
    ##  **Table of Contents** 
        #### Creator 
        #### Licensing
        #### Dependencies
        #### Tests
        #### Extra Info
        #### Interested in Contributing
         
        
    
    
    ## Created By: ${answers.userName}

    ## Licenses

        ##### ${answers.license}

    ## Dependencies

        ##### ${answers.dependencies}

    ## Tests 

        ##### ${answers.test}

    ## Extra Info

        ##### ${answers.needToKnow}

    ## Interested in Contributing

        #### ${answers.contribute}


           `
}


async function init() {
    console.log("hi");
    try {
        const answers = await questions();

        axios
            .get(`https://api.github.com/users/${answers.userName}`)
            .then((res) => {
                console.log(res.data);

                const gitHubImage = res.data.avatar_url;
            })
            .catch((err) => {
                console.log(err);
            })

        const readMe = generateReadMe(answers);
        
        await writeFileAsync("README.md", readMe);

        console.log("README.md successfully created!");

    } catch(err) {
        console.log(err);

    } 
}
init();