import { useState } from "react";
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoAPIoptions, option_url } from "../../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
      setSearch(searchData);
      onSearchChange(searchData);
  };

    const loadOptions = (inputValue) => {
        
      
        return fetch(`${option_url}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoAPIoptions)
          .then(response => response.json())
          .then(response => {
            return {
              options: response.data.map((city) => {
                return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
                };
              }),
            };
          });
          
      };





return (
    <AsyncPaginate
        placeholder="Search for City"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
    />

)
};




export default Search;