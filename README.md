# Fast Food Fast   
[![Build Status](https://travis-ci.org/dokenedgar/FFF-Handlebars.svg?branch=master)](https://travis-ci.org/dokenedgar/FFF-Handlebars)  [![Coverage Status](https://coveralls.io/repos/github/dokenedgar/FFF-Handlebars/badge.png?branch=master)](https://coveralls.io/github/dokenedgar/FFF-Handlebars?branch=master)

A Food ordering web-app that allows users to view food and order for food, and at the same time admins can view and act on those orders accordingly.

## Getting Started

### Prerequisites

To run this project locally on your system, you need to have node js installed on your system. If you don't have it, you can [download it here](https://nodejs.org/en/download/ "Download node js"). And then follow the instructions from the node website to install it. When you're done come back and proceed to the next step.

You also need to download and install git. Instructions on the download and installation [can be found here](https://git-scm.com/downloads "Download git").

To check whether you have them already on your system or verify that the installations were done successfully run the following from the command line:
```
node --version
```
This will print the version of node you've installed or an error message if none is found.
```
git version
```
This will print the version of git you've installed or an error message if none is found.

### Cloning

When you've verified git and node have been installed, create a directory and navigate to it. Once inside that directory, open the terminal, this can the the normal command prompt *CLI* or the *GIT BASH* you get after installing git.
**Note:** You need internet for this as well.
In the terminal, enter the following 
					```
					git clone https://github.com/dokenedgar/FFF-Handlebars.git
					```
When it runs successfully, you'll then have a local copy of the project available on your system. 
In the terminal run ,
```
git branch
```
to list all branches on the repo, and then 
```
git checkout develop
```
Once you're inside the develop branch, run
```
nmp install
```
to insall all required dependencies specified in the project.