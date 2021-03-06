
import './App.css';
import  { useState, useEffect } from "react";
import {Card, MenuItem, FormControl, Select, CardContent } from "@material-ui/core";
import InfoBox from './InfoBox';
//import Map from './Map';
import Table from './Table.js'
import {sortData}  from "./util.js";
import LineGraph from './LineGraph.js';


function App() {


  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const[countryInfo,setCountryInfo]=useState({});
  const [tableData, setTableData] = useState([]);

  const [casesType, setCasesType] = useState("cases");
  //https://disease.sh/v3/covid-19/countries
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      
      });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
       // setCountries(countries);
          const sortedData = sortData(data);
          
          //setMapCountries(data);
          setTableData(sortedData);
          setCountries(countries);
        
      });
    };
    getCountriesData();

  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("yooo", countryCode);
    setCountry(countryCode);
    const url=countryCode==='worldwide'?"https://disease.sh/v3/covid-19/all":`https//disease.sh/v3/covid-19/countries/${countryCode}`;
  await fetch(url).then((response)=>response.json())
  .then((data)=>{
    setCountry(countryCode);
    setCountryInfo(data);
   

  });
  
  };
  console.log("country info   ",countryInfo);
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_dropdown">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined"
              onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (<MenuItem value={country.value}>{country.name}</MenuItem>))}

            </Select>
          </FormControl>

        </div>
        <div className="app_stats">

          <InfoBox title="Coronavirus Cases"
           cases={countryInfo.todayCases} 
            total={countryInfo.cases}/>

          <InfoBox title="Recovered"
           cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}/>

          <InfoBox title="Deaths" 
          cases={countryInfo.todayDeaths}
          total={countryInfo.cases} />
        </div>
        <Map>

        </Map>*/}
      </div>
      <Card className="app_right">
       <CardContent>
       <h3>live cases by country</h3>
       <Table countries={tableData} />
        
       <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          
       </CardContent>
      </Card>
    </div>
  );
}

export default App;
