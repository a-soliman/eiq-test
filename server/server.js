const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const fs = require("fs");
const { Gstore, instances } = require("gstore-node");
const { Datastore } = require("@google-cloud/datastore");

/* MAKE FRESH REQUIRE TO THE DATASTORE KEYS FILE */
const DATASTORE_KEYS_PATH = "./config/data_store_keys.json";
delete require.cache[require.resolve(DATASTORE_KEYS_PATH)];
const project_id = require(DATASTORE_KEYS_PATH).project_id;

/* DATABASE CONFIGURATION */
const gstore = new Gstore({ errorOnEntityNotFound: false });
const datastore = new Datastore({
  projectId: project_id,
  keyFilename: path.join(__dirname, DATASTORE_KEYS_PATH)
});

gstore.connect(datastore);

instances.set("00002", gstore);

const {
  listBuckets,
  findBucketByName,
  bucketExists
} = require("./buckets/bucket");

/* ROUTES */
const users = require("./routes/api/users");

/* EXPRESS APP */
const app = express();
const port = process.env.PORT || 5555;

/* BODY PARSER CONFIGURATIONS */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* POINTING PUBLIC FOLDER */
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

/* PASSPORT AUTHENTICATION CONFIGURATION */
app.use(passport.initialize());
require("./config/passport")(passport);
require("./config/passport_google")(passport);

/* USE ROUTES */
app.use("/api/users", users);

/* SERVE REACT APP FOR ALL ROUTES */
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
