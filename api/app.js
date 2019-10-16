import config from 'dotenv';
import express from 'express';
import cors from'cors';
import bodyParser from 'body-parser';
import DoteeRoutes from './server/routes/DoteeRoutes';

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8000;

app.use('/api/v1/dotee', DoteeRoutes);
// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to Dotee API.'
}));
app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;