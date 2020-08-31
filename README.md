# CSCI4050-Bookstore

An online bookstore group project for CSCI 4050 Fall 2020 at the University of Georgia.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installing Node.js on MacOS or Linux](#installing-node.js-on-macos-or-linux)
- [Installation](#installation)
- [Understanding Our React.js Front-end vs. Java Spring Back-end](#understanding-our-react.js-front-end-vs.-java-spring-back-end)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git.](https://git-scm.com/downloads) OSX and Linux typically already have this installed.
- Java 11 - Google "Install Java 11 [Your development OS]" if you don't already have it installed. I'd recommend using a package manager (apt or yum) if you're using Linux.
- Node.js (v12.18.3) - [Download & Install Node.js.](https://nodejs.org/en/) Again I'd recommend using a package manager if you're on linux (instead of downloading binaries).
- npm (6.14.8) - Comes with Node.js. [Get the latest stable version of npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm).
- MariaDB (10.5) or MySQL (5.7) - [Download & Install MariaDB.](https://mariadb.org/download/) or [Download & Install MySQL.](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) These two are interchangeable though I prefer MariaDB as it is completely open source. MariaDB has the same exact CLI as MySQL.

## Installing Node.js on MacOS or Linux

If you are using a MacOS or Linux development machine, I would recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) for installing Node.js. Visit the [nvm Github]{https://github.com/nvm-sh/nvm} and install nvm using the `curl` or `wget` links provided there and then run the following command:

`nvm install 12.18.3`

This will download and install Node.js v12.18.3 and npm 6.14.6. Then try:

`npm install -g npm@next`

To get the lastest npm version. This should install npm 6.14.8.

## Installation

The following instructions pertain mostly to a Linux development machine, but it should not be too hard to generalize to Windows or OSX. I will add notes where steps might be different based on the development operating system.

### Clone The Repository

```bash
git clone git@github.com:alexcostaluiz/CSCI4050-Bookstore.git
```

I would recommend using the *Clone with SSH* instead of *Clone with HTTPS* URL as the https URL will require you to input your GitHub username and password for every push / pull. When cloning with ssh you must copy the contents of the `.ssh/id_rsa.pub` on your development machine to your GitHub Profile->Settings->SSH and GPG Keys. Then you can push and pull securely without providing your password everytime or storing your password in a plaintext file.

### Install the Prerequisites

Once you have downloaded the aforementioned prerequisites, check to make sure you have the correct versions installed.

```bash
java -version
>> openjdk version "11.0.8" 2020-07-14
>> OpenJDK Runtime Environment (build 11.0.8+10-post-Raspbian-1deb10u1)
>> OpenJDK Server VM (build 11.0.8+10-post-Raspbian-1deb10u1, mixed mode)
```

Just make sure you see OpenJDK and 11.

```bash
node --version
>> v12.18.3
```

```bash
npm --version
>> 6.14.8
```

```bash
mysql --version
>> mysql  Ver 15.1 Distrib 10.3.23-MariaDB, for debian-linux-gnueabihf (armv7l) using readline 5.2
```

The output for the `mysql --version` will vary for everyone, just make sure its MariaDB >= 10.1 or MySQL >= 5.6 and I think everything will work fine. Everyone's local database will just be for testing purposes and I assume we will have a "production" server where we can push the master branch and keep production-quality data in the database. Not sure exactly what the best way to share database data would be yet. If anyone has any ideas definitely bring it up in a meeting or on Discord.

## Understanding Our React.js Front-end vs. Java Spring Back-end

Adding this section just because I know it took me a little while to understand how React.js works with a back-end service like Java Servlets or Spring Boot. If you already are familiar with this, please skip this section.

Because we are using React for our front-end development, things work a little differently than you might expect or be familiar with. Instead of being a collection of static files or template files served by the backend service itself, React runs its own Node.js service which converts the React JavaScript files we have written into static HTML, CSS, and JavaScript and serves them itself (default port: 3000).

React also works as a [single-page application](https://en.wikipedia.org/wiki/Single-page_application). This means that when your browser connect to this React service at port 3000, it downloads a big minified bundle of all the React JavaScript code we have written for every page and modal instead of just the HTML, CSS, and JavaScript for the single page that we are requesting. Then when a user changes pages (e.g. goes from the home page to their user profile page) the client browser rewrites the DOM tree locally instead of making another round trip to our server to download more files. (Single-page application just means that the client browser only makes one trip the the server for HTML, JavaScript, and CSS files instead of making multiple trips every time a user requests a new page. It doesn't mean our application can't have more than one page).

But of course we can't send every possible piece of data that the user might encounter on our application in one go, so while all the front-end UI files are downloaded in one transaction, database data (e.g. book information, user information, etc.) is transmitted to the client on a need-to-know basis from our Java Spring Boot Back-end API. This is done through fetch calls in our React front-end code (checkout the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)).

In essence, our React front-end declares all the UI and UX information, as well as when data needs to be fetched from our back-end, and our Java Spring Boot back-end serves raw JSON data as a REST API and interfaces with the persistent database through CRUD operations.

## Development 

There are two directories where most development will occur: the `src/` directory within the parent directory of this repository where all Java Spring Boot files can be found and the `frontend/src/` directory where all React files can be found.

### Front-end Development

To run the front-end devlopment server, please run the following commands:

```bash
cd frontend/
npm start
```

This should start the front-end service at port 3000 with the following output:

```bash
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.19:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

While your writing front-end code, you can leave this service running in-between making changes to files (e.g. `^Z`, make change to file, then `fg 1`) and it will detect the changes and recompile so that you don't need to start and stop the server every time you make edits to the front-end files.

### Back-end Development

To run the back-end development server, please run the following commands in the project parent directory:

```bash
make run
```

OR

```boot
./mvnw spring-boot:run
```

You should see a load of Maven output followed by something like:

```boot
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.3.3.RELEASE)

2020-08-31 02:40:46.609  INFO 1050 --- [  restartedMain] c.c.bookstore.BookstoreApplication       : Starting BookstoreApplication on raspberrypi with PID 1050 (/home/alexcostaluiz/bookstore/target/classes started by alexcostaluiz in /home/alexcostaluiz/bookstore)

...

2020-08-31 02:40:56.688  INFO 1050 --- [  restartedMain] DeferredRepositoryInitializationListener : Spring Data repositories initialized!
2020-08-31 02:40:56.872  INFO 1050 --- [  restartedMain] c.c.bookstore.BookstoreApplication       : Started BookstoreApplication in 11.65 seconds (JVM running for 13.722)
2020-08-31 02:40:57.409  INFO 1050 --- [         task-1] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2020-08-31 02:40:57.428  INFO 1050 --- [         task-1] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
```

You can then connect to the server at http://localhost:8080.

### Both Front-end and Back-end Development

If you are working on something that requires both services to be running in tandem, simply follow the instructions for **Back-end Development**, then run the following:

```bash
^Z
bg
```

Then the backend service should be running in the background. (You can verify this with the `jobs` command. Make sure "Running" is before the `make run` or `./mvnw spring-boot:run` commands).

Then simply follow the instructions for **Front-end Development**. Connect to the front-end service at port 3000 (e.g. http://localhost:3000) and now any fetch calls to the back-end for database data will work correctly.

## Deployment

To deploy the entire project into a single, executable JAR, simply run:

```bash
make package
```

OR

```bash
./mvnw package
```

This will compile both the front-end and back-end codebase and create a single, executable JAR file in the `target/` directory of the project parent directory. To execute this JAR file, simply run:

```bash
java -jar bookstore-0.0.1-SNAPSHOT.jar
```

This will begin the Java Spring Boot service on port 8080. It may not look like React is running, but all React files are compiled into the JAR and when you connect to the service at http://localhost:8080/ both the front-end and back-end should be working together seamlessly.

Eventually, we can set up a "production" server which maintains a copy of the master branch and deploys this JAR to port 80 at a public IP address / domain name so we can all see the "production" status of our application.

## Contributing

When contributing please follow the following instructions:

Open your feature branch `git checkout -b my-new-branch` or `git branch my-new-branch; git checkout my-new-branch`.  
Stage changed files for commit `git add [changed files]`.  
Commit changes to your new branch `git commit -m "A commit message (present tense)"`.  
Push commits to remote branch `git push -u origin my-new-branch` (you may simply use `git push` once the upstream branch has been set using the `-u` flag as in the previous example).  
Open a Pull Request on GitHub.com.

Please do NOT make commits directly to the master branch.

## License
