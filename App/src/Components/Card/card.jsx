import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function CardComponent({ title, body, id, className}){
    return(<>
        <Card className={className}>
                <CardContent>
                  <h5>{title}</h5>
                  <p>{body}</p>
                  <small>{id}</small>
                </CardContent>
              </Card>
    </>)
}