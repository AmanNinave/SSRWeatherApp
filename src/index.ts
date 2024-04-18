import * as  express from  'express';
import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    try {
        const location = req.query.location as string;
        let weatherData = null;
        if (location) {
            weatherData = await getWeatherData(location);
        }
        res.render('index', { weatherData });
    } catch (error) {
        res.render('error', { error: 'Error fetching weather data' });
    }
});

app.post('/weather', async (req: Request, res: Response) => {
    try {
        const location = req.body.location as string;
        const weatherData = await getWeatherData(location);
        res.render('index', { weatherData });
    } catch (error) {
        res.render('error', { error: 'Error fetching weather data' });
    }
});

async function getWeatherData(location: string) {
    const apiKey = process.env.APP_API_KEY; 
    const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`);

    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

    return weatherResponse.data; 
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
