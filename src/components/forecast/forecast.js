import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion"
import './forecast.css'

const week_days = ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday'];



const forecast = ({ data }) => {
  const dayinweek = new Date().getDay();
  const forecastDays = week_days.slice(dayinweek, week_days.length).concat(
    week_days.slice(0, dayinweek)
  );

  return (
    <>
      <label className='title'>Weekly forecast</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>

            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`} />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="descrip">{item.weather[0].description}</label>
                  <label className="min-max">{Math.round(item.main.temp_min)}°C /{Math.round(item.main.temp_max)}°C </label>

                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details">
                <div className="daily-details-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure}Pas</label>
                </div><div className="daily-details-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-item">
                  <label>Wind Speed</label>
                  <label>{item.wind.speed}m/s</label>
                </div>
                <div className="daily-details-item">
                  <label>Sea Level</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-item">
                  <label>Feels like</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}


      </Accordion>
    </>);
};

export default forecast