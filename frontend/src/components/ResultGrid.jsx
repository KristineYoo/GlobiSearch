import Grid from '@mui/material/Grid2';
import ResultCard from './ResultCard';

import React, {useState, useEffect} from 'react';


function ResultGrid(items) {
  console.log(items)
  console.log(items.items.topResults[0])

    return (
        // get the entire grid and map the results of each dict to frontend
        // mapping each key to its value
        <Grid container spacing={4} justifyContent="center">
          <Grid size={4}>
            <ResultCard info={items.items.topResults[0]}></ResultCard>  
          </Grid>
          <Grid size={4}>
            <ResultCard info={items.items.topResults[1]}></ResultCard>  
          </Grid>
          <Grid size={4}>
            <ResultCard info={items.items.topResults[2]}></ResultCard>  
          </Grid>
      </Grid>
    )
}
    


export default ResultGrid


