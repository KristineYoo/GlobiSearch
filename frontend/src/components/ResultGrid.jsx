import Grid from '@mui/material/Grid2';
import ResultCard from './ResultCard';


function ResultGrid(){
    const results={
        title:"test",
        lang:"french",
        snippit:"This is a snippet",
        link:"https://mui.com/material-ui/react-grid2/?srsltid=AfmBOor3kQQeeqeRT_VWKixPHCtXxTnnbLBxgo4TJ0dZ8D0jqRU49sld"
    }

    return (
        <Grid container spacing={4} justifyContent="center">
            <Grid size={4}>
                <ResultCard info={results}/>
            </Grid>
            <Grid size={4}>
                <ResultCard info={results}/>
            </Grid>
            <Grid size={4}>
                <ResultCard info={results}/>
            </Grid>
        </Grid>
    )
}

export default ResultGrid


