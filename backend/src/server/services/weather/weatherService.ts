import fetch from 'node-fetch';

const apiKey = process.env.WEATHER_API_KEY || '';

export type WeatherResult = {
  description: string;
  tempC: number;
  icon: string; // e.g. "01d"
  suggestWalk: boolean;
};

export async function getWeather(lat: number, lon: number): Promise<WeatherResult> {
  if (!apiKey) {
    const tempC = 20 + Math.round(((lat + lon) % 10));
    return {
      description: 'Partly cloudy',
      tempC,
      icon: '02d',
      suggestWalk: tempC >= 10 && tempC <= 28,
    };
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const json: any = await res.json();
  const weather = json.weather?.[0];
  const main = json.main;
  const tempC = Math.round(main?.temp ?? 20);
  const description = weather?.description || 'Weather';
  const icon = weather?.icon || '01d';
  return {
    description,
    tempC,
    icon,
    suggestWalk: tempC >= 10 && tempC <= 28 && !/rain|storm|snow/i.test(description),
  };
}