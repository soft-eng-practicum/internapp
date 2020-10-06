<div style="text-align:center"><img src ="public/images/logos.png" /></div>

# InternApp - Tech Titans

**Repository Location URL:** [Github Repository InternshipApp](https://github.com/soft-eng-practicum/internapp/tree/fall2018)

**Process Tool and URL:** [Jira](http://itec-gunay.duckdns.org:8080/)

**Communication Tool:** [#TechTitans Discord](https://discordapp.com/channels/349336806208045068/484669720797118479)

**Live Application Link:** [InternApp](http://ggc-internapp.herokuapp.com/)

## License

**Attribution-ShareAlike 4.0 International (CC BY-SA 4.0):** [Legal implications](https://creativecommons.org/licenses/by-sa/4.0/legalcode)

**Signed Fall 2018 License Agreement:** [Google drive link](https://drive.google.com/file/d/0B7qocu_f8Ouqa2NQdnVpZWtSVlE/view?usp=sharing)

## Overview

_Internapp is a web application designed to centralize the application process for the Information Technology (ITEC 4900) and Biology (BIOL 4800) internship programs for both student and coordinator. The application will allow for students to apply to the ITEC and BIOL internship programs and for the internship program coordinators to view, download, and archive the applications. The coordinators will be able to provide feedback and update the status of a student's application, which the student will be able to view. Information pertaining to possible/current internship job sites will also be stored._

## Fall 2018 Final Report

**Final Report:** [Google docs link](https://docs.google.com/document/d/14bPVeReTpH6RkloFUZmiIxMZo8cSe6K3K5anvwolyLU/edit?usp=sharing)

## CREATE Fall 2018

**Survey:** [Surveymonkey Link](https://www.surveymonkey.com/r/PDBYFQT)

**Survey Results:** [Google docs link](https://drive.google.com/open?id=1g0W9waGUavpq-RcSLb5mhasSQGrxeIgh)

## Application Videos

**Final demo video:** [Google docs link](https://drive.google.com/open?id=1xodxNxzcsSZH2Ne7Zw9WUetn8DXt5THZ)

**Admin / Instructor & User (Student) help videos:** [Google docs link](https://drive.google.com/open?id=1cq0CpIgEMnVpqNSvyIA5uAYXXzTBwhPd)

## Clientele

- Information Technology Internship Program Coordinator - [Dr. Lissa Pollacia](http://www.ggc.edu/about-ggc/directory/lissa-pollacia)
- Biology Internship Program Coordinator - [Dr. Latanya P. Hammonds-Odie](http://www.ggc.edu/about-ggc/directory/latanya-hammonds-odie)

## Internship Program Information

- [Information Technology Internship Program](http://www.ggc.edu/academics/schools/school-of-science-and-technology/internships/#itec4900)
- [Biology Internship Program](http://www.ggc.edu/academics/schools/school-of-science-and-technology/internships/#chem4800)

## Fall 2018 Team Members

1. _Kidus Dawit - [@kidus13](https://github.com/kidus13):_ **_QA_** & **_Team Lead_** <br>
2. _Anastasia Arnold_ - [@aarnold7](https://github.com/aarnold7): **_Code Architecture/Lead Programmer_** & **_UI/UX Design_**<br>
3. _Billy Pridgen_ - [@WilliamPridgen](https://github.com/WilliamPridgen): **_Data Modeler_** & **_Client Liaison_** <br>
4. _Edgar Juarez_ - [@ejuarezcabrera](https://github.com/ejuarezcabrera): **_Documentation Lead_** & **_Programmer_** <br>

## Spring 2017 Team Members

1. _Blake Norman_ - [@bnorman37](https://github.com/blakenorman37): **_Project Manager_** & **_Testing Lead_**<br>
2. _Michael Cawthon_ - [@mcawthon](https://github.com/mcawthon): **_Data Modeler_** & **_Programmer_**<br>
3. _Robert Bryan_ - [@rbryan21](https://github.com/rbryan21): **_Lead Programmer_** & **_Documentation Lead_**<br>
4. _Khaled Asad_ - [@khaledasad](https://github.com/khaledasad): **_UI/UX Design_** & **_Testing_**<br>

## Fall 2016 Team Members

1. _Vimal Darji :_ **_QA_** & **_Team Lead_** <br>
2. _Taylor Brust :_ **_Client Liason_** <br>
3. _Joseph Cox :_ **_Lead programmer_** & **_Data modeler_**<br>
4. _Jonathan Nguyen :_ **_UI/UX Design_** & **_Documentation lead_**<br>

## Running the application on your local machine

1. **[Install Node.js (either version is fine)](https://nodejs.org/en/)**<br>

   &nbsp;&nbsp;&nbsp;&nbsp;a. To ensure you have Node.js installed, run 'node --version' within your terminal/command line<br/>

2. **[Clone this github repository to your local machine](https://github.com/soft-eng-practicum/internapp)**<br>
3. **Navigate to the internapp folder in your terminal/command line**<br>
4. **Run the command 'npm install'**<br>
5. **Run the command 'npm start'**<br>
6. **Navigate to localhost:8000/ within your browser**<br>

## Setting up your Database

In order to properly use your branch of the InternApp you will need to create a mongoDB Cluster to store your data.  Follow these instructions to get started!


*Everyone involved in the project will need to create a mongoDB Atlas account. Only one member will need to create the cluster*

### CREATING A CLUSTER

Head to https://www.mongodb.com/cloud/atlas/signup and create an account.  I would advise using your GGC email.  Under the "How are you using MongoDB" tab you can select "I'm migrating an app to Atlas (Cloud)". (After creating an account you will need to confirm your email)

You will be taken to an Account Setup Page where you can choose the name of your organization as well as the project name.  You can choose anything you want for these names but I recommend choosing a name related to the GGC or the InternApp.  
Click the continue button at the bottom of the page to move on to the next step.

On the next page you are asked to select a Cluster.  Select the free version and click "Create a cluster". 

You can leave the default settings for the cluster, however I recommend changing the cluster name at the bottom to something relevant to the project.  (Example: InternAppCluster).  After you have done that, click "Create Cluster".

After following these steps you should have successfully created your Cluster!  It generally takes about 1-3 minutes for your cluster to be completely set up.  

### CONNECTING TO YOUR CLUSTER

In order to connect your local InternApp to your cluster you will need to whitelist your IP address, create a database user, and create your connection string.  The following steps will go over that process.

Under the clusters tab you should see your newly-created InternAppCluster (it will appear as whatever you ended up naming it).  Click on the "Connect" button to bring up the setup window. 

Whitelisting your IP address will give your computer access to the cluster.  You can either add your specific IP address by clicking on the "Add Your Current IP address" button, or you can allow access from anyone by clicking on the "Allow Access from Anywhere" button.  (It is less secure to allow access from anywhere but since the data in isn't sensitive, you don't really need to worry about that)

Create a database user in the same window by entering a username and creating a password.  For sake of the tutorial I will use a very generic username and password.  When you create your own database user you should use the Autogenerated Secure Password function.  I am going to use 'databaseuser' as the username and 'dbpassword' for the password.  You will need to remember these because they will be a part of the connection string later on.  Once you have selected a username and password you are satisfied with, click "Create Database User".  To continue on to the next step, click "Choose a connection method."

Once you have whitelisted your IP address and created a database user, you will be taken to the next window where you can choose a connection method.  Click on the 'Connect your application' option. For the driver select Node.js. Since the intern app was built with an older version of Node.js, select '2.2.12 or later' for the version of Node.js.  

Under the section titled "Add your connection string into your application code" copy the text that is provided.  This is the connection string you will use to connect your local version of the InternApp to the cluster.  

The string provided should be:

"mongodb://databaseuser:<password>@internappcluster-shard-00-00.v2tjo.mongodb.net:27017,internappcluster-shard-00-01.v2tjo.mongodb.net:27017,internappcluster-shard-00-02.v2tjo.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-101tzy-shard-0&authSource=admin&retryWrites=true&w=majority"

You will notice that inside that connection string are the fields databaseuser, <dbname> and <password>. You will need to change the string to include the database user's username and password as well as the name of the database.  In this example, the parameters are as follows:

username: databaseuser
passowrd: dbpassword
dbname: internapp (this should be the default name of your database)

After adding in those parameters the connection string is:

"mongodb://databaseuser:dbpassword@internappcluster-shard-00-00.v2tjo.mongodb.net:27017,internappcluster-shard-00-01.v2tjo.mongodb.net:27017,internappcluster-shard-00-02.v2tjo.mongodb.net:27017/internapp?ssl=true&replicaSet=atlas-101tzy-shard-0&authSource=admin&retryWrites=true&w=majority"

Now you have successfully created your connection string.  

The final step is the establish the connection between your local version and your cluster.  For this we will need to use the connection string you just created in the previous step.  Upon launching your app using the 'npm start' command, you will need to change your DB_CONN variable to the connection string.  To do that, run the following code in the terminal.

DB_CONN="mongodb://databaseuser:dbpassword@internappcluster-shard-00-00.v2tjo.mongodb.net:27017,internappcluster-shard-00-01.v2tjo.mongodb.net:27017,internappcluster-shard-00-02.v2tjo.mongodb.net:27017/internapp?ssl=true&replicaSet=atlas-101tzy-shard-0&authSource=admin&retryWrites=true&w=majority" npm start

Now your connection is established and your setup is complete!