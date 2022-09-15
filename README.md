# README Generator
 UofU-VIRT-FSF-PT-07-2022-U-LOLC-MWTH Module 09 Node.js Challenge: Professional README Generator
 
## Description
I created a README generator to meet two needs: 1) I wanted to speed up the process of getting a repository up and running, and 2) I wanted to improve the quality of my README.md files. This generator walks a user through an inital set of questions to decide what to include in the README and based on the responses asks for any additional needed information. Once all the information has been collected, the generator creates a README.md file.
 
## Project Requirements

### User Story

```md
AS A developer
I WANT a README generator
SO THAT I can quickly create a professional README for a new project
```

### Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I am prompted for information about my application repository
THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
WHEN I enter my project title
THEN this is displayed as the title of the README
WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
WHEN I choose a license for my application from a list of options
THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
WHEN I enter my GitHub username
THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
WHEN I enter my email address
THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
WHEN I click on the links in the Table of Contents
THEN I am taken to the corresponding section of the README
```

