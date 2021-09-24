# Table of Contents
___
- [Choosing between a MongoDB Community Server and MongoDB Atlas](#choosing-between-a-mongodb-community-server-and-mongodb-atlas)
  * [Setting up a MongoDB Community Server](#setting-up-a-mongodb-community-server)
    + [Connecting to your instance](#connecting-to-your-instance)
      - [Setting DB_CONN via Command Prompt/Terminal](#setting-db-conn-via-command-prompt-terminal)
      - [Setting DB_CONN via the ``dotenv`` package](#setting-db-conn-via-the---dotenv---package)
      - [Setting DB_CONN in JetBrain's Webstorm configuration settings](#setting-db-conn-in-jetbrain-s-webstorm-configuration-settings)
      - [Setting DB_CONN via Windows Control Panel](#setting-db-conn-via-windows-control-panel)
  * [Setting up on MongoDB Atlas](#setting-up-on-mongodb-atlas)
    + [Creating a cluster](#creating-a-cluster)
    + [Connecting to your cluster](#connecting-to-your-cluster)
  * [Update history](#update-history)
  * [Credits](#credits)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


# Choosing between a MongoDB Community Server and MongoDB Atlas
___
Two options for setting up a MongoDB instance for running the app will be explained here. The first option is to install the MongoDB Community Server and mongoSh (mongo shell) locally on your machine. The second option is to use MongoDB's Atlas service, which hosts a cluster on the cloud. 

One is not necessarily better than the other. Atlas will allow your team to easily create and track data in one place while a local community server on your personal machine will allow you to create data that exists only on your computer. There is also nothing preventing you from doing both, though there is little reason to do so. However, if you have trouble maintaining a stable internet connection, setting up a local server might be the best option for you.

## Setting up a MongoDB Community Server
___
To set up a local instance of MongoDB you will need to download the MongoDB Community Server. The specific installation steps can change depending on the platform (e.g. Windows, macOS, Linux, AWS, etc...), so you'll have to identify what platform your machine is running before downloading the appropriate executable. 

On Windows, this is as simple as downloading the msi package and running the installer.

A list of tutorials for installing the Community Edition for Linux, macOS, and Windows can be found [here](https://docs.mongodb.com/manual/installation/).

Once you've completed the installation, it is highly recommended to [install mongoSh](https://docs.mongodb.com/mongodb-shell/install/), but it isn't technically necessary, especially if you installed MongoDB Compass provided in the community server installation. The main thing is to have a way to interact with the database directly and both mongoSh and MongoDB Compass provide this, with the main difference being one is a shell-based interface and the other is a GUI.

When you're finished installing the MongoDB community server, you need to start the database. If you installed on Windows and kept the default option to install it as a Windows service, then you don't need to do anything else, as Windows should have started the server automatically.

If you opted to not install as a Windows service, or have installed on a different platform that does not provide a like option, then you'll need to start the database manually. The steps to start it manually on Windows is detailed [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#if-you-did-not-install-mongodb-as-a-windows-service). You will have to find the documentation to start it manually for your platform on [docs.mongodb.com](https://docs.mongodb.com/) if you're using a platform other than Windows.

Once you have your server up and running, it's time to connect the InternApp to it. The tutorial [here](https://docs.mongodb.com/mongodb-shell/connect/#local-mongodb-instance-on-default-port) explains how to connect to the local instance via mongoSh, but we won't be connecting to it via mongoSh. Instead, we'll use the default connection address provided on that page (``mongodb://localhost:27017``) to connect the app to the database.

### Connecting to your instance
___

The InternApp uses node's process.env in order to provide certain configurable variables to the application at the app's runtime, including the database's address. The name of the environment variable for the database address is called DB_CONN. Therefore, an environment variable named DB_CONN must be set with a valid mongoDB connection string before the app can deploy. There are many ways of setting an environment variable and the ways can differ sometimes substantially from IDE to IDE, Windows or Linux, whether you're operating in the terminal or command prompt, and even between programming languages. In our case, I will detail four different ways of setting environment variables and let you choose.

<a id="setting-db-conn-via-command-prompt-terminal"></a>
#### Setting DB_CONN via Command Prompt/Terminal
Via Command Prompt:

    set DB_CONN=mongodb://localhost:27017

Via terminal (macOS/linux):

    DB_CONN="mongodb://localhost:27017"

This method has the disadvantage of requiring inputting these commands upon every new instance of command prompt or terminal prior to starting the app.

<a id="setting-db-conn-via-the---dotenv---package"></a>
#### Setting DB_CONN via the ``dotenv`` package
The ``dotenv`` node package is installed in the InternApp upon running npm install. Setting DB_CONN with this method is easy. Simply create a new file called ``.env`` inside the project's root directory (i.e. where your package.json is). Inside this ``.env`` file, write a line like so:

    DB_CONN="mongodb://localhost:27017"

Upon running npm start, ``dotenv`` will scan for the file and read all valid environment variables into node's process.env. This way also ensures you only have to do this once. 

<a id="setting-db-conn-in-jetbrain-s-webstorm-configuration-settings"></a>
#### Setting DB_CONN in JetBrain's Webstorm configuration settings

Under Webstorm version 2021.1.2, navigate to the 'Run' tab at the top of the IDE. From there, find 'Edit Configurations'. Find the + sign at the top left of the popup (or alternatively, press alt + insert) to add a new configuration. Navigate through the dropdown and find npm and select it. Now, on the right side window that starts with the 'Name' field, make sure that the package.json field points to the package.json in your project directory. Make sure the 'Command' field is set to start. Finally, set the 'Environment' field to:

    DB_CONN=mongodb://localhost:27017

Note the lack of double quotes around the address. None of the variations in quote usage so far have been typos. The usage of quotes is particular to each method and you should take care to match the format exactly.

<a id="setting-db-conn-via-windows-control-panel"></a>
#### Setting DB_CONN via Windows Control Panel 
Navigate to Control Panel -> System and Security -> System. Under Device Specifications, find the 'Related links' and find the 'Advanced system settings'. A System Properties window should popup. Find the 'Environment Variables' button under the 'Advanced' tab. A new window titled Environment Variables should have opened. Under user variables, click 'New'. For 'Variable name' enter ``DB_CONN``. For variable value enter ``mongodb://localhost:27017``, or whatever your mongoDB's connection address is. Press Ok to all windows.

This method also only needs to be done once, but will mean that a user environment variable called DB_CONN will exist for your Windows profile until you remove it.

This concludes the tutorial for setting up a MongoDB community server and connecting your InternApp to it. The four methods above are also usable for connecting the InternApp to a MongoDB Atlas cluster. The only difference will be in the connection string (i.e. not a localhost address and port but a connection string created by MongoDB for your cluster). Since the Atlas section was written first, its subsection on connecting the cluster only details the terminal method for setting the DB_CONN variable necessary for the app to connect to the database. If you elect to set up an Atlas cluster instead of a local instance of MongoDB, you may wish to return here for information on how to set the variable.

## Setting up on MongoDB Atlas
___

In order to properly use your branch of the InternApp you will need to create a MongoDB Cluster to store your data.  Follow these instructions to get started!


*Everyone involved in the project will need to create a MongoDB Atlas account. Only one member will need to create the cluster*

### Creating a cluster
___

Head to https://www.mongodb.com/cloud/atlas/signup and create an account.  I would advise using your GGC email.  Under the "How are you using MongoDB" tab you can select "I'm migrating an app to Atlas (Cloud)". After creating an account you will need to confirm your email.

You will be taken to an Account Setup Page where you can choose the name of your organization as well as the project name.  You can choose anything you want for these names, but I recommend choosing a name related to the GGC or the InternApp.  
Click the continue button at the bottom of the page to move on to the next step.

On the next page you are asked to select a cluster.  Select the free version and click "Create a cluster".

You can leave the default settings for the cluster, however I recommend changing the cluster name at the bottom to something relevant to the project (example: InternAppCluster).  After you have done that, click "Create Cluster".

After following these steps you should have successfully created your cluster!  It generally takes about 1-3 minutes for your cluster to be completely set up.

### Connecting to your cluster
___

In order to connect your local InternApp to your cluster you will need to whitelist your IP address, create a database user, and create your connection string.  The following steps will go over that process.

Under the clusters tab you should see your newly-created InternAppCluster (it will appear as whatever you ended up naming it).  Click on the "Connect" button to bring up the setup window.

Whitelisting your IP address will give your computer access to the cluster.  You can either add your specific IP address by clicking on the "Add Your Current IP address" button, or you can allow access from anyone by clicking on the "Allow Access from Anywhere" button.  (It is less secure to allow access from anywhere but if the data isn't sensitive, you don't really need to worry about that.)

Create a database user in the same window by entering a username and creating a password.  For the sake of this tutorial I will use a very generic username and password.  When you create your own database user you should use the Autogenerated Secure Password function.  In my example, I am going to use 'databaseuser' as the username and 'dbpassword' for the password.  You will need to remember your credentials because they will be a part of the connection string later on.  Once you have selected a username and password you are satisfied with, click "Create Database User".  To continue on to the next step, click "Choose a connection method."

Once you have whitelisted your IP address and created a database user, you will be taken to the next window where you can choose a connection method.  Click on the 'Connect your application' option. For the driver select Node.js. Since the InternApp was built with an older version of Node.js, select '2.2.12 or later' for the version of Node.js.

Under the section titled "Add your connection string into your application code" copy the text that is provided.  This is the connection string you will use to connect your local version of the InternApp to the cluster.

The string provided should be:

"mongodb://databaseuser:<password>@internappcluster-shard-00-00.v2tjo.mongodb.net:27017,internappcluster-shard-00-01.v2tjo.mongodb.net:27017,internappcluster-shard-00-02.v2tjo.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-101tzy-shard-0&authSource=admin&retryWrites=true&w=majority"

You will notice that inside that connection string are the fields databaseuser, <dbname> and <password>. You will need to change the string to include the database user's username and password as well as the name of the database.  In this example, the parameters are as follows:

username: databaseuser
password: dbpassword
dbname: internapp (this should be the name of your database, which you can find by selecting your cluster and navigating to the collections tab, which should load your list of databases.)

They are the exact values I've chosen in previous steps. After adding in those parameters the connection string is:

"mongodb://databaseuser:dbpassword@internappcluster-shard-00-00.v2tjo.mongodb.net:27017,internappcluster-shard-00-01.v2tjo.mongodb.net:27017,internappcluster-shard-00-02.v2tjo.mongodb.net:27017/internapp?ssl=true&replicaSet=atlas-101tzy-shard-0&authSource=admin&retryWrites=true&w=majority"

Now you have successfully created your connection string.

The final step is to establish the connection between your local version and your cluster.  For this we will need to use the connection string you just created in the previous step.  Before launching your app using the 'npm start' command, you will need to change your DB_CONN variable to the connection string you generated and set in the previous step.  To do that, run the following code in the terminal:

DB_CONN="mongodb://databaseuser:dbpassword@internappcluster-shard-00-00.v2tjo.mongodb.net:27017,internappcluster-shard-00-01.v2tjo.mongodb.net:27017,internappcluster-shard-00-02.v2tjo.mongodb.net:27017/internapp?ssl=true&replicaSet=atlas-101tzy-shard-0&authSource=admin&retryWrites=true&w=majority" npm start

This will set a variable called DB_CONN with your MongoDB connection string, which is provisioned to the app upon starting.
(NOTE: You will have to repeat this command every time you wish to launch the app.)

With this your connection is established and your setup is complete!
___

## Update history
___
- (Oct 2020): Initial writeup.
- (Sept 2021): Edits to Atlas section and added instructions for local MongoDB option.
    + Added more ways of setting the DB_CONN variable.


## Credits
___
*Special thanks to [Jordan Vincent](https://github.com/jordantvincent) for the writeup on Atlas.*

Edited by [Ethan Kim](https://github.com/ekim22).
