require("dotenv").config();
require("../config/mongo");
const pangolins = require("./../json/pangolins-db.json").pangolins;
const pangolinModel = require("./../models/pangolin");

(async function () {
  try {
    try {
      await pangolinModel.collection.drop();
      const res = await pangolinModel.create(pangolins);
      console.log(res.length + " pangolins created in database");
    } catch (err) {
      if (err.code === 26) {
        console.log(
          "namespace %s not found, creating collection ",
          pangolinModel.collection.name
        );
        const res = await pangolinModel.create(pangolins);
        console.log(res.length + " pangolins created in database");
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(error);
  }
})();
