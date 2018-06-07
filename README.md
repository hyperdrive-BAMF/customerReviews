# Vapor - customerReviews

This repo is a portion of my Hack Reactor Front-End Capstone Project for cohort HRSF95 (project embarked early June 2018). This project encompasses the re-creation of a Product Experience modeled after an existing App's "Product Details Page", in the scope of service-oriented architecture.

Our team ([BAMF](https://github.com/hyperdrive-BAMF)) chose [Steam's](https://store.steampowered.com) individual Game Store Pages, and my section mimick's the 'Customer Reviews' widget, comprised of graphed information tracking reviews over time, and a display of relevant reviews based on the user's choice of filters.

Once configured and running, this service is self-contained and independent of other concerns. Incoming page requests are served by Express and the index page is injected with the primary ReactJS Component (which has been compiled by Webpack). The component  then performs API Requests to the Express server and these are backed by a PostgreSQL database. Retrieved data then updates component state which re-renders  
the ReactJS Component(s) as appropriate to deliver the client UI experience.


### Related Projects

The following are the other 'Vapor' Component repos from my teammates.

  - [Splash Carousel](https://github.com/hyperdrive-BAMF/splash-page-eric)
  - [Related Games](https://github.com/hyperdrive-BAMF/relatedGames)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Requirements

- `Node` _(version used: 10.3.0)_
- `npm` _(version used: 6.1.0)_
- `PostgreSQL` _(version used: 10.4)_

## Usage

### Local Development Installation / Start

Note that these instructions assume a MacOSX environment with [Homebrew](https://brew.sh/) installed.  
If your environment is different you may need to consult relevant documentation.

##### 1. Install `Node` (`npm` should come bundled with it) and `PostgresSQL`  

   ```sh
   $ brew install node postgresql
   ```

##### 2. Start the postgresql service

  ```sh
  $ brew service start postgresql
  ``` 

##### 3. Install Node Dependencies (while in this repo's root directory)  

  ```sh
  $ npm install
  ```

##### 4. Create Database (PostgreSQL) and run initial Migration and Seeding

  ```sh 
  $ npm run init-db
  ```

##### 5. Compile JS via Webpack

  ```sh 
  $ npm run build
  ```

##### 6. Start the Webserver and Open Browser _(webserver will run in background)_

  ```sh
  $ npm start
  ```
