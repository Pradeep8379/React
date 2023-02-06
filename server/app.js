const dotenv = require('dotenv');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

dotenv.config({ path: './config.env' });

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log('mongodb connected');
    }).catch((err) => {
        console.log(err);
    })
app.use(express.json())

app.use(require('./router/auth'))
// app.get('/', (req, res) => {
//     res.send('Hello from server')
// });

// app.get('/about', (req, res) => {
//     res.send('Hello from about')
// });

// app.get('/contact', (req, res) => {
//     res.send('Hello from contact')
// });

// app.get('/signin', (req, res) => {
//     res.send('Hello from signin')
// });

// app.get('/signup', (req, res) => {
//     res.send('Hello from signup')
// });
app.listen(process.env.PORT, () => {
    console.log(`Port is running on server ${process.env.PORT}`);
})