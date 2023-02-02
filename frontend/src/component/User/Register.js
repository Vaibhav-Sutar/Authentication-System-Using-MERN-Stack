import { useState, useEffect } from "react";
import '../../App.css'
import Loader from "../layout/Loader/Loader.js";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {register } from "../../actions/userAction";
import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Google from "mdi-material-ui/Google";
import CloudUpload from "mdi-material-ui/CloudUpload";
import Github from "mdi-material-ui/Github";
import Twitter from "mdi-material-ui/Twitter";
import Facebook from "mdi-material-ui/Facebook";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import Card from "@mui/material/Card";
const Register = ({ history, location }) => {
  
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isAuthenticated } = useSelector(
      (state) => state.user
    );
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const { name, email, password } = user;
  
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    
    const redirect = location.search ? location.search.split("=")[1] : "/account";
  
    
    useEffect(() => {
     
  
      if (isAuthenticated) {
        history.push(redirect);
      }
    }, [dispatch, error, alert, history, isAuthenticated, redirect]);
    const registerSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
      if (name === "") {
        alert.error("Enter Full Detail");

    } else if (email === "") {
      alert.error("Enter Full Detail");

    } else if (password==="") {
      alert.error("Enter Full Detail");

    } else if (!avatar) {
      alert.error("Enter Full Detail");

    } 
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      dispatch(register(myForm));
    };
  
    const registerDataChange = (e) => {
      if (e.target.name === "avatar") {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    };
  
    const [values, setValues] = useState({
      password: "",
      showPassword: false,
    });
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
      registerDataChange(event);
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  return (
    < >
    {
      loading ? (<Loader/>) :(
        <>
        <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        padding:"10px",
        backgroundColor:"#f4f5fa",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ zIndex: 1, width: "28rem"}}>
        <CardContent sx={{ padding:"2rem"}}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "1.5rem !important",
              }}
            >
              Register
            </Typography>
          </Box>
          <Box sx={{ mb: 3}}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Welcome to the Register Page👋🏻
            </Typography>
            <Typography variant="body2"  sx={{ fontWeight: 400, fontSize:"16px" }}>
              Please register to our website and start your journey
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
             <TextField
              autoFocus
              fullWidth
              id="name"
              label="Name"
              value={name}
              name="name"
              onChange={registerDataChange}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              autoFocus
              fullWidth
              id="email"
              name="email"
              label="Email"    
              value={email}
              onChange={registerDataChange}
              sx={{ marginBottom: "10px" }}
            />
           
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                name="password"
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div id="registerImage" style={{display:"flex", justifyContent:"space-between",width:"100%",height:"73px",marginTop:"15px",marginBottom:"15px",}}>
                  <img src={avatarPreview} alt="Avatar Preview" style={{
                    
                    width: "70px",
                    objectFit:"cover",
                    height: "70px",
                      border: "4px solid rgb(137, 207, 240)",
                      borderRadius: "70px",
                    }}  />
                  <label class="custom-file-upload">

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                  <CloudUpload  sx={ {width:"35px",height:"35px",color:"#1976d2",marginLeft:"40%",marginTop:"5%"}}/>
                  </label>
                </div>
            <Box
              sx={{
                mt: "5px",
                mb:"5px",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              
            </Box>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              value="Register"
              sx={{ marginBottom: 2 }}
            >
              Register
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2">
                <NavLink passHref to="/login"  style={{textDecoration: 'none',color:"#212121",fontSize:"14px"}}>
                Already have an account?
                </NavLink>
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }}>or</Divider>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href="/" passHref>
                <IconButton component="a" onClick={(e) => e.preventDefault()}>
                  <Facebook sx={{ color: "#497ce2" }} />
                </IconButton>
              </Link>
              <Link href="/" passHref>
                <IconButton component="a" onClick={(e) => e.preventDefault()}>
                  <Twitter sx={{ color: "#1da1f2" }} />
                </IconButton>
              </Link>
              <Link href="/" passHref>
                <IconButton component="a" onClick={(e) => e.preventDefault()}>
                  <Github sx={{ color: "#272727" }} />
                </IconButton>
              </Link>
              <Link href="/" passHref>
                <IconButton component="a" onClick={(e) => e.preventDefault()}>
                  <Google sx={{ color: "#db4437" }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
        </>
      )
    }
   
    
    </>
  );
};

export default Register;
