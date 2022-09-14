const fs = require('fs');
const inquirer = require('inquirer');


const basicQuestions = [
    {
        type: 'input',
        message: 'What is your project title?',
        default: 'Title Placeholder',
        name: 'title'
    },
    {
        type: 'confirm',
        message: 'Do you want to add a detailed description?',
        name: 'descriptionYN',

    },
    {
        type: 'confirm',
        message: 'Do you have a features list?',
        name: 'featureYN',
    },
    {
        type: 'confirm',
        message: 'Do you have installation instructions?',
        name: 'installationYN',
    },
    {
        type: 'confirm',
        message: 'Do you have usage details or instructions?',
        name: 'usageYN',
    },
    {
        type: 'confirm',
        message: 'Do you need to include credits?',
        name: 'creditsYN',
    },
    {
        type: 'confirm',
        message: 'Do you need to include licensing details?',
        name: 'licenseYN',
    },
];
const detailedDescription = [
    {
        type: 'input',
        message: 'What was your motivation?',
        default: 'I was motivated to build this when/because...',
        name: 'projectMotivation'
    },
    {
        type: 'input',
        message: 'Why did you build this project?',
        default: 'I decided to build this project because...',
        name: 'projectWhy'
    },
    {
        type: 'input',
        message: 'What problem does it solve?',
        default: 'This project solves a problem where...',
        name: 'projectSolves'
    },
    {
        type: 'input',
        message: 'What makes this project standout?',
        default: '... makes the project unique',
        name: 'projectUnique'
    },

];
const shortDescription = [

    {
        type: 'input',
        message: 'Why did you build this project?',
        default: 'I decided to build this project because...',
        name: 'projectWhy'
    },
    {
        type: 'input',
        message: 'What problem does it solve?',
        default: 'This project solves a problem where...',
        name: 'projectSolves'
    }

];
const featureQuestions = [
    {
        type: 'input',
        message: 'What are the key features of your project (comma separated list)?',
        default: 'first feature, second feature, third feature',
        name: 'projectFeature'
    }
];

const installationQuestions = [
    {
        type: 'input',
        message: 'What are the steps required to install your project?',
        default: 'This project solves a problem where...',
        name: 'projectInstallation'
    }
];
const usageQuestions = [
    {
        type: 'input',
        message: 'What are the special usage notes for your project?',
        default: 'Usage notes...',
        name: 'projectUsage'
    }
];
const creditQuestions = [
    {
        type: 'input',
        message: 'Who do you need to credit for your project?',
        default: 'Credit list...',
        name: 'projectCredit'
    }
];
const licenseQuestions = [
    {
        type: 'input',
        message: 'Is there licensing information for this project?',
        default: 'License Information...',
        name: 'projectLicense'
    }
];



// Ask basic questions
// Ask for title and description (short or detailed)
// Add to README object
// Ask if extra sessions are need
// If yes, add TOC to the README object
// If no, don't add TOC
// Ask additional questions
// Add to README object


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => 
    err ? console.log(err) : console.log('Creating Readme.md'))
 }

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(basicQuestions)
        .then((response) => evaluateAnswers(response))
        .then((readmeStr) => writeToFile('README.md', readmeStr))
};

async function evaluateAnswers(answers) {
    const { title, descriptionYN, featureYN, installationYN, usageYN, creditsYN, licenseYN } = answers;
    let readme = `#${title}\n\n`;

    let dsc = (descriptionYN) ?  detailedDescription : shortDescription;

    let dscAns = await inquirer.prompt(dsc);
    readme += buildReadmeSection(dscAns, 'Description');

    readme += addTOC(featureYN, installationYN, usageYN, creditsYN, licenseYN);

    let featAns = await inquirer.prompt(featureQuestions);
    readme += buildReadmeSection(featAns, 'Features', 'ulist');

    let instAns = await inquirer.prompt(installationQuestions);
    readme += buildReadmeSection(instAns, 'Installation');

    let uesAns = await inquirer.prompt(usageQuestions);
    readme += buildReadmeSection(uesAns, 'Usage');

    let credAns = await inquirer.prompt(creditQuestions);
    readme += buildReadmeSection(credAns, 'Credits');

    let licAns = await inquirer.prompt(licenseQuestions);
    readme += buildReadmeSection(licAns, 'License');

    return readme
}

function buildReadmeSection(answers, section, style = 'basic') {
    let markup = '';
    let readmeSection = '';
    switch (style) {
        case 'ulist':
            markup = '-';
            break;
        case 'olist':
            markup = '*';
            break;
        case 'quote':
            markup = '>';
            break;
        case 'h2':
            markup = '##';
            break;
        case 'h3':
            markup = '###';
            break;
        default:
            break;
    }

    readmeSection += `##${section}\n`;
    for (const answer of Object.values(answers)) {
        if (style === 'ulist' || style === 'olist') {
            readmeSection += answer.split(',').reduce((str, item) => str += `${markup}${item.trim()}\n`, '');
            
        } else {
            readmeSection += `${markup}${answer}\n`;
        }
    }
    readmeSection += `\n\n`;
    return readmeSection;
}

function addTOC(feature, installation, usage, credit, license) {
    console.log('in TOC');
    let TOC = '';
    if (feature) {
        TOC += '-[Features](#features)\n';
    }
    if (installation) {
        TOC += '-[Installation](#installation)\n';
    }
    if (usage) {
        TOC += '-[Usage](#usage)\n';
    }
    if (credit) {
        TOC += '-[Credits](#credits)\n';
    }
    if (license) {
        TOC += '-[License](#license)\n';
    }

    TOC += '\n\n'

    return TOC
}
// Function call to initialize app
init();
