import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    res.json('hii');
})

app.listen(port, () => {
    console.log('server started at port', port);
})