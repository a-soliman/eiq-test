const { Storage } = require("@google-cloud/storage");
const path = require("path");

/* MAKE FRESH REQUIRE TO THE DATASTORE KEYS FILE */
const DATASTORE_KEYS_PATH = "../config/data_store_keys.json";
delete require.cache[require.resolve(DATASTORE_KEYS_PATH)];
const project_id = require(DATASTORE_KEYS_PATH).project_id;

const storage = new Storage({
  projectId: project_id,
  keyFilename: path.join(__dirname, DATASTORE_KEYS_PATH)
});

const listBuckets = () => {
  storage
    .getBuckets()
    .then(results => {
      const buckets = results[0];

      console.log("Buckets:");
      buckets.forEach(bucket => {
        console.log(bucket.name);
      });
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
};

const findBucketByName = name => {
  return storage
    .bucket(name)
    .get()
    .then(bucket => bucket)
    .catch(err => "Bucket was not found!");
};

const bucketExists = name => {
  return storage
    .bucket(name)
    .get()
    .then(bucket => bucket)
    .catch(err => false);
};

const createBucket = name => {
  return storage.createBucket(name).then(bucket => {
    console.log("created bucked : ", name);
  });
};

module.exports = { listBuckets, findBucketByName, bucketExists, createBucket };
