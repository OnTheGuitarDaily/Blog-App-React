import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
   <nav className="d-flex justify-content-between align-items-center mb-3 p-2 Nav">
    <NavLink to = '/'>
    <h1 className='NameLink'>Blog-Post</h1>
    </NavLink>
    <div className='d-flex gap-4'>
      <NavLink to = '/'>
          <IconButton>
              <HomeIcon className='Icon p-1' fontSize='large'/>
          </IconButton>
      </NavLink>
      <NavLink to = 'create'>
        <IconButton>
            <AddIcon className='Icon p-1' fontSize='large'/>
        </IconButton>
      </NavLink>
    </div>
   </nav>
  );
}

export default Nav;