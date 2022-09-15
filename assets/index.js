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
        message: 'Has anyone else contributed to this project?',
        name: 'contributeYN',
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
        default: 'I was motivated to build this when...',
        name: 'projectMotivation'
    },
    {
        type: 'input',
        message: 'Why did you build this project?',
        default: 'I built this project because...',
        name: 'projectWhy'
    },
    {
        type: 'input',
        message: 'What problem does it solve?',
        default: 'This project solves...',
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
        default: 'I built this project because...',
        name: 'projectWhy'
    },
    {
        type: 'input',
        message: 'What problem does it solve?',
        default: 'This project solves...',
        name: 'projectSolves'
    }

];
const featureQuestions = [
    {
        type: 'input',
        message: 'What are the key features of your project? (input:comma separated list)',
        default: 'first feature, second feature, third feature',
        name: 'projectFeature'
    }
];

const installationQuestions = [
    {
        type: 'input',
        message: 'What are the steps required to install your project? (input:comma separated list)',
        default: 'first step, second step, third step',
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
const contributionQuestions = [
    {
        type: 'input',
        message: 'What are the contribution guidelines for this project?',
        default: 'How to contribute...',
        name: 'projectCredit'
    }
];
const testQuestions = [
    {
        type: 'input',
        message: 'Please provide test instructions',
        default: 'To test...',
        name: 'projectTest'
    }
];
const questionQuestions = [
    {
        type: 'input',
        message: 'Are there any questions for this project?',
        default: 'Credit list...',
        name: 'projectQuestion'
    }
];
const licenseQuestions = [
    {
        type: 'list',
        message: 'Which license do you want to use for this  project?',
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'projectLicense'
    }

];


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
        .then((readmeParts) => buildReadme(readmeParts))
        .then((readmeStr) => writeToFile('README.md', readmeStr))
};

async function evaluateAnswers(answers) {
    const { title, descriptionYN, featureYN, installationYN, usageYN, contributeYN, testYN, questionYN, licenseYN } = answers;
    let document = {
        title: `# ${title}\n`,
        badge: '',
        sections: []
    };

    let dsc = (descriptionYN) ? detailedDescription : shortDescription;
    let dscAns = await inquirer.prompt(dsc);
    document.description = buildDocumentSection(dscAns, 'Description', 'paragraph');

    document.TOC = addTOC(featureYN, installationYN, usageYN, contributeYN, testYN, questionYN, licenseYN);

    if (featureYN) {
        let featAns = await inquirer.prompt(featureQuestions);
        document.sections.push(buildDocumentSection(featAns, 'Features', 'ulist'));
    }

    if (installationYN) {
        let instAns = await inquirer.prompt(installationQuestions);
        document.sections.push(buildDocumentSection(instAns, 'Installation', 'olist'));
    }

    if (usageYN) {
        let useAns = await inquirer.prompt(usageQuestions);
        document.sections.push(buildDocumentSection(useAns, 'Usage'));
    }

    if (contributeYN) {
        let contribAns = await inquirer.prompt(contributionQuestions);
        document.sections.push(buildDocumentSection(contribAns, 'Contributions'));
    }

    if (testYN) {
        let testAns = await inquirer.prompt(testQuestions);
        document.sections.push(buildDocumentSection(testAns, 'Tests'));
    }

    if (questionYN) {
        let questionAns = await inquirer.prompt(questionQuestions);
        document.sections.push(buildDocumentSection(questionAns, 'Questions'));
    }

    if (licenseYN) {
        let licAns = await inquirer.prompt(licenseQuestions);
        document.badge = buildBadge(licAns.projectLicense);
        document.sections.push(buildDocumentSection(licAns, 'License', 'badge'));
    }

    return document
}

function buildBadge(license) {
    return `<span display="inline" height="20px" class="common__BadgeWrapper-sc-11baoah-3 ekSFIk"><img alt="APM badge" src="https://img.shields.io/badge/license-${license}-green"></span>\n\n`;
}

function buildDocumentSection(answers, section, style = 'basic') {
    let markup = '';
    let documentSection = {
        name: section,
        text: ''
    };
    switch (style) {
        case 'ulist':
            markup = '- ';
            break;
        case 'olist':
            markup = '* ';
            break;
        case 'quote':
            markup = '> ';
            break;
        case 'h2':
            markup = '## ';
            break;
        case 'h3':
            markup = '### ';
            break;
        case 'paragraph':
            markup = '\n ';
            break;
        default:
            break;
    }

    documentSection.text += `## ${section}\n`;
    for (const answer of Object.values(answers)) {
        if (style === 'ulist' || style === 'olist') {
            documentSection.text += answer.split(',').reduce((str, item) => str += `${markup}${item.trim()}\n`, '');

        } else {
            documentSection.text += `${markup}${answer}\n`;
        }
        if (section === 'License') {
            switch (section) {
                case 'GNU AGPLv3':
                    documentSection.text += 'Permissions of this strongest copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. When a modified version is used to provide a service over a network, the complete source code of the modified version must be made available.\n';
                    break;
                case 'GNU GPLv3':
                    documentSection.text += 'Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.\n';
                    break;
                case 'GNU LGPLv3':
                    documentSection.text += 'Permissions of this copyleft license are conditioned on making available complete source code of licensed works and modifications under the same license or the GNU GPLv3. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. However, a larger work using the licensed work through interfaces provided by the licensed work may be distributed under different terms and without source code for the larger work.\n';
                    break;
                case 'Mozilla Public License 2.0':
                    documentSection.text += 'Permissions of this weak copyleft license are conditioned on making available source code of licensed files and modifications of those files under the same license (or in certain cases, one of the GNU licenses). Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. However, a larger work using the licensed work may be distributed under different terms and without source code for files added in the larger work.\n';
                    break;
                case 'Apache License 2.0':
                    documentSection.text += 'A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.\n';
                    break;
                case 'MIT License':
                    documentSection.text += 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.\n';
                    break;
                case 'Boost Software License 1.0':
                    documentSection.text += 'A simple permissive license only requiring preservation of copyright and license notices for source (and not binary) distribution. Licensed works, modifications, and larger works may be distributed under different terms and without source code.\n';
                    break;
                case 'The Unlicense':
                    documentSection.text += 'A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code.\n';
                    break;

                default:
                    break;
            }
        }
    }
    documentSection.text += `\n\n`;
    return documentSection;
}

function addTOC(feature, installation, usage, contributions, tests, questions, license) {
    let TOC = '## Table of Contents\n';
    if (feature) {
        TOC += '- [Features](#features)\n';
    }
    if (installation) {
        TOC += '- [Installation](#installation)\n';
    }
    if (usage) {
        TOC += '- [Usage](#usage)\n';
    }
    if (contributions) {
        TOC += '- [Contributions](#contributions)\n';
    }
    if (tests) {
        TOC += '- [Tests](#tests)\n';
    }
    if (questions) {
        TOC += '- [Questions](#questions)\n';
    }
    if (license) {
        TOC += '- [License](#license)\n';
    }

    TOC += '\n\n'

    return TOC
}

function buildReadme(document) {
    let readme = document.title;
    readme += document.badge;
    readme += document.description.text;
    if (document.TOC) {
        readme += document.TOC;
    }
    if (document.sections) {
        for (const section of document.sections) {
            readme += section.text
        }
    }
    return Promise.resolve(readme)
}
// Function call to initialize app
init();
