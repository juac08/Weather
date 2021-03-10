import React, { useState, useEffect, useContext } from "react";
import Loading from './Loading'
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("Oslo");
  const url ='https://api.openweathermap.org/data/2.5/weather?q='+ name +'&units=metric&appid='+ process.env.REACT_APP_KEY+'';
    const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const i = await response.json();
      setData(i);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <Loading/>
  };
  if (!data.main) {
     return <h1 className="section-center">Invalid City. Go Back And Try Again</h1>

  }
  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        loading,
        setLoading,
        getData,
        setName,
      }}
    >
      <></>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
