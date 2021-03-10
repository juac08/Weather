import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useGlobalContext } from "./context";
import Footer from "./footer";
import { motion} from 'framer-motion';
function FetchData() {
  const { setName, data, getData } = useGlobalContext();
  let time = new Date().getHours().toString();
  return (
    <>
      <motion.section className={time >= 16 && time >= 4 ? "night" : "day"}
         initial={{opacity:0,}}
            animate={{opacity:1,}}
            exit={{opacity:0, y:'-100vh'}}
            transition={{duration:1}}>
        <form className="form-control" onSubmit={getData}>
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <Button variant="contained"  onClick={getData} style={{marginLeft:'5px',background:'black', color:'white'}}>
            Search
          </Button>
        </form>
        {data.weather.map((item) => {
          const { id, main, icon } = item;
          const ic = "https://openweathermap.org/img/w/" + icon + ".png";
          return (
            <>
            <div key={id} className="container">
              <h1>{data.name}</h1>
              <p>{new Date().toString().split(" ").splice(1, 3).join(" ")}</p>
              <h1>{Math.floor(data.main.temp)} °C</h1>
              <h4>{main}</h4>
              <p>Feels Like:{Math.floor(data.main.feels_like)} °C </p>
              <img className="img-w" src={ic} alt="name" />
            </div>
            </>
          );
        })}
        <Footer />
      </motion.section>
    </>
  );
}
export default FetchData;
