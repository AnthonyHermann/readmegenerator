const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the project title?"
    },
    {
      type: "input",
      name: "description",
      message: "What is the project description?"
    },
    {
      type: "input",
      name: "installation",
      message: "What are the instructions for installation?"
    },
    {
      type: "input",
      name: "usage",
      message: "What are the instructions for usage?"
    },
    {
      type: "input",
      name: "tests",
      message: "What are the instructions for tests?"
    },
    {
    type: "input",
    name: "questions",
    message: "What is your GitHub Username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?"
        },
    {
      type: "list",
      name: "license",
      message: "Enter your LinkedIn URL.",
      choices: [
          "MIT",
          "ISC",
          "Mozilla"
      ]
    }
  ]);
}

function generateREADME(answers) {
    
    var mit = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    var isc = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
    var mozilla = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    var licenseUsed = "";

    if (answers.license === "MIT") {
        licenseUsed = mit;
      }
      else if (answers.license === "ISC") {
        licenseUsed = isc;
      }
      else if (answers.license === "Mozilla") {
        licenseUsed = mozilla;
      }
  return `
  # ${answers.title}
  ${licenseUsed}

  ## Description

  ${answers.description}

  ## Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  * [License](#license)

  ## Installation

  ${answers.installation}

  ## Usage

  ${answers.usage}

  ## Contributing

  The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard to use for contributing.

  ## Tests

  ${answers.tests}

  ## Questions

  * Ask a question on [GitHub](https://github.com/${answers.questions})
  * Or email me at <${answers.email}>

  ## License

  © 2020 All Rights Reserved.

  Licensed under the ${answers.license} license.
  `;
}



promptUser()
  .then(function(answers) {
    const markdown = generateREADME(answers);

    return writeFileAsync("README.md", markdown);
  })
  .then(function() {
    console.log("Your README.md file is complete!");
  })
  .catch(function(err) {
    console.log(err);
  });


