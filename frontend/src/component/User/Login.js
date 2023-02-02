import { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader.js";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import Google from "mdi-material-ui/Google";
import Github from "mdi-material-ui/Github";
import Twitter from "mdi-material-ui/Twitter";
import Facebook from "mdi-material-ui/Facebook";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import { useAlert } from "react-alert";
import Card from "@mui/material/Card";

const Login = ({ history, location }) => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
   

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const loginSubmit = (e) => {
    if (loginEmail === "") {
      alert.error("Enter Full Detail");
  } else if (loginPassword === "") {
    alert.error("Enter Full Detail");
  }
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  return (
    <>
    {loading ? (<Loader/>) : (
      <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          padding: "10px",
          backgroundColor: "#f4f5fa",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ zIndex: 1, width: "28rem" }}>
          <CardContent sx={{ padding: "2rem" }}>
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
                Login
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, marginBottom: 1.5 }}
              >
                Welcome to Login Page 👋🏻
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 400, fontSize:"16px" }}>
                Sign-in to your account
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete="off"
              encType="multipart/form-data"
              onSubmit={loginSubmit}
            >
              <TextField
                autoFocus
                fullWidth
                id="name"
                label="Email"
                name="name"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                sx={{ marginBottom: "15px" }}
              />
              <TextField
                label="Password"
                variant="outlined"
                onChange={(e) => setLoginPassword(e.target.value)}
                sx={{ marginBottom: "15px" ,width:"100%"}}
                type={showPassword ? "text" : "password"} 
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  mt: "5px",
                  mb: "15px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Link
                  passHref
                  href="/"
                  style={{
                    textDecoration: "none",
                    color: "#212121",
                    fontSize: "16px",
                  }}
                >
                  <Typography>
                    <NavLink
                      passHref
                      to="/password/forgot"
                      style={{
                        textDecoration: "none",
                        color: "#212121",
                        fontSize: "14px",
                      }}
                    >
                      Forgot Password
                    </NavLink>
                  </Typography>
                </Link>
              </Box>
              <Button
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                value="Login"
                sx={{ marginBottom: 2 }}
              >
                Login
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
                  <NavLink
                    passHref
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "#212121",
                      fontSize: "14px",
                    }}
                  >
                    Create an account
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
    )}
      
    </>
  );
};

export default Login;
