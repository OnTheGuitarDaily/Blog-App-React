import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';

export default function AccordionComponent({name, username, email, city, phone, user}){
    return(<>
            <Accordion className='col-12'>
                <AccordionSummary>
                {user && <small>User: {name}</small>}
                </AccordionSummary>
                <AccordionDetails>
                {user && (
                    <>
                    <div className="d-flex gap-2">
                        <AccountCircleIcon />
                        <p>{username}</p>
                    </div>
                    <div className="d-flex gap-2">
                        <AlternateEmailIcon />
                        <p>{email}</p>
                    </div>
                    <div className="d-flex gap-2">
                        <HomeIcon />
                        <p>{city}</p>
                    </div>
                    <div className="d-flex gap-2">
                        <PhoneIcon />
                        <p>{phone}</p>
                    </div>
                    </>
                )}
                </AccordionDetails>
            </Accordion>
    </>)
}