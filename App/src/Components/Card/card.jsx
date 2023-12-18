import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function CardComponent({key, title, body, id, className}){
    return(<>
        <Card key={key} className={className}>
                <CardContent>
                  <h5>{title}</h5>
                  <p>{body}</p>
                  <small>{id}</small>
                </CardContent>
              </Card>
    </>)
}