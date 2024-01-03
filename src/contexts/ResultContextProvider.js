import React, {createContext,useContext,useState} from "react";
import axios from 'axios'
 
const ResultContext=createContext();
const baseUrl="https://seo-api.p.rapidapi.com/v1";


export const ResultContextProvider = ({children}) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('Israel');

    const getResults = async (url) => {
        setIsLoading(true);
    
        const res = await fetch(`${baseUrl}${url}`, {
          method: 'GET',
          headers: {
            'X-User-Agent': 'desktop',
            'X-Proxy-Location': 'EU',
            'x-rapidapi-host': 'seo-api.p.rapidapi.com',
            'x-rapidapi-key': '',
          },
        });
        const data = await res.json();

        setResults(data);
        setIsLoading(false);
    }

  return (
    <ResultContext.Provider value={{getResults,results,searchTerm,setSearchTerm,isLoading}}>
        {children}
    </ResultContext.Provider>
  )
}

export const useResultContext=()=> useContext(ResultContext);
