const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(() =>{
    console.log("connection successful");
   })
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

const initDB = async ()=>{
   await Listing.deleteMany({});
   initdata.data = initdata.data.map((obj) =>({ ...obj, owner:"688a262b6b6b3188f4896619"}))
   await Listing.insertMany(initdata.data);
   console.log("Data was initialized");
};

initDB();
