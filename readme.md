# EIQ - Test

## CSV Validator

- Given a .CSV file, it should upload it to the server (in memory), then validate it, then store it into Google Cloud Storage, then store it's properties in google Cloud Platform, and responde with these properties ie (isValid, rowsCount, colsCount, itemsCount, idealItemsCount, fileSize, currentUserId, and a list of rows that contain issues).

### Technologies:

#### Server Side

- NodeJS
- ExpressJS
- PassportJS (Authentication)
- OAuth2
- JWT,
- Multer

#### Client Side

- ReactJS
- Redux
- Webpack
- Babel
- Axios
- Sass
- BootStrap 4
- jQuery
- Font Awesome (React Package)

#### Database

- GCP - Data Store
- GCP - Cloud Storage

#### Unit Test

- Jest
- Enzyme
- React Test Renderer

---

### Server Configuration:

1. Proxy :
   - use "proxy": "http://localhost:5555", in 'package.json', making sure that the port = the backend server's port on /server/server.js = devserver.proxy in /webpack.config.js

### Installation

1. Install [Node](https://nodejs.org/en/)
2. Clone this REPO
   ```
   git clone https://github.com/a-soliman/eiq-test.git
   ```
   ```
   cd eiq-test/
   ```
3. Install the required packges
   Run 'npm install' or 'npm i' to install the required packages.
   ```
   npm install
   ```
4. Place the attached keys files (data_store_keys.json & keys_dev.js) in this directory /server/config/

---

### Running the Dev Server:

1. Combined Front-End & Back-End Server

   - Runs 2 servers (Express and Webpack) in one terminal window using [concurrently](https://www.npmjs.com/package/concurrently)

   ```
   npm run dev-server
   ```

   - Open your browser at port 8080 => [http://localhost:8080](http://localhost:8080)

2. Front-End Server (Webpack)
   ```
   npm run dev-server:client
   ```

- Open your browser at port 8080 => [http://localhost:8080](http://localhost:8080)

3. Back-End Server (Nodemon)
   ```
   npm run dev-server:server
   ```
   - Check your console, Port 5555 must be vacated
4. Unit Testing Server (Jest, Enzyme)
   ```
   npm run test
   ```

---

### Deployment

#### Heroku:

- This boilerplate is configured to run at Heroku with no need for further configuration.

1. Go through the traditional [Heroku-Cli setup](https://devcenter.heroku.com/articles/heroku-cli).
2. At the root level of the project
   ```
   heroku create
   ```
3. push to Heroku
   ```
   git push heroku master
   ```

---
