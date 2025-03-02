import Grid from '@mui/material/Grid2';
import ResultCard from './ResultCard';

import React, {useState, useEffect} from 'react';


function ResultGrid() {

    // add loading state to display loading 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // then chaining to get response w/ then chaining 
    useEffect(() => {
        // get data from our flask api
        fetch("https://localhost:5000/api/get-search-result")
        .then(response => {
                // throw the error if something happens (server side)
                if (!response.ok) {
                    throw new Error("Server couldn't send data");
                }
                return response.json()
        })
        
        // get data into react state and make loading false
        .then( data => {
            setData(data)
            setLoading(false)
        })

        // show possible error in server console
        .catch(error =>{
            console.error(error)
        });
    }, []);
    
    // add if statements for loading to display components
    if (loading) return <p>Loading..</p>;

    if (error) return <p>the error: {error}</p>;

    if (!data) return <p>No data could be found?</p>

    return (
        // get the entire grid and map the results of each dict to frontend
        // mapping each key to its value
        <Grid container spacing={4} justifyContent="center">
        {data['top-results'].map((result, index) => (
          <Grid size={4} key={index}>
            <ResultCard info={result} />
          </Grid>
        ))}
      </Grid>
    )
}
    


export default ResultGrid


