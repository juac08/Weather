import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useGlobalContext } from "./context";
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import Bounce from 'react-reveal/Bounce';
function FetchData() {
 
  const { setName, data, getData } = useGlobalContext();
  let time = new Date().getHours().toString();
  return (
    <>

      <section className={time >= 16 && time >= 4 ? "night" : "day"}>
        <form className="form-control" onSubmit={getData}>
          <TextField
            id="outlined-basic"
            label="City"
            variant="filled"
            placeholder='Enter City Name'
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            style={{background:'#edf0f3',borderRadius:'15px'}}
          />
          <Button variant="contained" color="default" 
          style={{marginLeft:'1rem',
           padding:' 20px',
          borderRadius:'10%',

          }} 
          onClick={getData} >
            Search
          </Button>
        </form>
        {data.weather.map((item) => {
          const { id, main, icon } = item;
          const ic = "https://openweathermap.org/img/w/" + icon + ".png";
          return (
            <>
            <div key={id} className="container">
              <Zoom><h1>{data.name}</h1></Zoom>
              <p>{new Date().toString().split(" ").splice(1, 3).join(" ")}</p>
              <Bounce><h1>{Math.floor(data.main.temp)} °C</h1></Bounce>
              <Flip><h4>{main}</h4></Flip>
              <Bounce><p>Feels Like:{Math.floor(data.main.feels_like)} °C </p></Bounce>
              <Flip><img className="img-w" src={ic} alt="name" /></Flip>
            </div>
            </>
          );
        })}
      </section>
    </>
  );
}
export default FetchData;
