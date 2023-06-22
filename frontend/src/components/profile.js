import { Divider, Typography, Button, Card} from "@mui/material";
import { CardContent, CardActions, Grid} from "@mui/material"; 
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Avatar } from '@mui/material';

const styles = {
    color: 'white',
    size: '14px', 
};

export default function Profile({profile, click}) 
{

    function handleClick(profile){
        click(profile);  
    }
    
    return (
        <div>
        <Avatar  onClick={() => handleClick(profile)} sx={{ width: 160, height: 160 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" size="100%" variant="square"/>   
        <p style={styles} >{profile.name}</p>  
        </div>  
    );
}