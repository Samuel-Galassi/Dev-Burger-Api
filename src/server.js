import 'dotenv/config';
import app from "./app.js";
import './database/index.js';


const port = process.env.PORT
app.listen(port, () => {
    console.log('Server running on port 3001');
});