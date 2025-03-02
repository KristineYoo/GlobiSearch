import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';


function ResultCard(info) {
    console.log(info["title"])
    return(
        <Card sx={{maxWidth:400, backgroundColor:"#ECE8FF"}}>
            <CardContent>
                <Typography variant='h5'>
                    {info["title"]}
                </Typography>
                <Typography variant='body2'>
                    From {info["lang"]}
                </Typography>
                <Typography variant='body1'>
                    {info["snippet"]}
                </Typography>
            </CardContent>
            <CardActions>
                <Button  variant="text" size='small' component="a" href={info.link} target="_blank">Visit Site</Button>
            </CardActions>
        </Card>
    )
}

export default ResultCard