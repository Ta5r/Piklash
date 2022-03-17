import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Cards from '../components/Cards';

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('Loading..');
  const [myid, setMYID] = useState('');
  const [img, setImg] = useState('');  
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const redirect_profile = () => {
    navigate('/myprofile')
  }
  const redirect_leaderboard = () => {
    navigate('/leaderboard');
  }
  const redirect_logout = () => {
    navigate('/');
    console.log("from logout redirect");
  }
  
  const callProfilePage = async () => {
    try {
      let data = await fetch("/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      data = await data.json();
      console.log(data);      
      setName(data.name);
      setMYID(data._id);
      setImg(data.selectedFile);
       if (!data.status === 200) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      console.log("Unsuccesful operation");
    }
    
  };

  useEffect(() => {
    callProfilePage();
  }, []);

  return (
    <>

    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 100, display: { xs: 'none', md: 'flex' } }}
          >
            {name}
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {name}
          </Typography>
         

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Settings" src={img} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem key="profile" onClick={redirect_profile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key="leaderboard" onClick={redirect_leaderboard}>
                  <Typography textAlign="center">LeaderBoard</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={redirect_logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <Cards myid={myid}/>
    </>
  );
};

export default Profile;