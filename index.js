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
        1. [Creator] (#creator) 
        2. [Licenses] (#licenses)
        3. [Dependencies] (#dependencies)
        4. [Tests] (#tests)
        5. [Extras] (#extras)
        6. Contribute (#contribute)
         
        
    
    
    ## Creator ${answers.userName}
        ![GitHub_Picture](${gitHubImage})
        

    ## Licenses

        ##### ${answers.license}

    ## Dependencies

        ##### ${answers.dependencies}

    ## Tests 

        ##### ${answers.test}

    ## Extras

        ##### ${answers.needToKnow}

    ## Contribute

        #### ${answers.contribute}


           `
}


async function init() {
    console.log("hi");
    try {
        
        
        const answers = await questions();
        
        const response = await axios
            .get(`https://api.github.com/users/${answers.userName}`)
            .then((res) => {
                console.log(res.data.avatar_url);
        
                const gitHubImage = res.data.avatar_url;

            })
            .catch((err) => {
                console.log(err);
            })


        console.log(response);
            
        const readMe = generateReadMe(answers);
        
        await writeFileAsync("README.md", readMe);

        console.log("README.md successfully created!");

    } catch(err) {
        console.log(err);

    } 
}
init();