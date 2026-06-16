// server ko start krna
// dB se connect krna
require('dotenv').config(); 
// without installing dotenv package , you will not be able to access the environment variables defined in the .env file.
const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();




app.listen(3000, () => {
    console.log("server is running on port 3000");
});