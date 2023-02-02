import { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader.js";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import Card from "@mui/material/Card";


const ProResetPassword = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(match.params.token, myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully");
  
        history.push("/login");
      }
    }, [dispatch, error, alert, history, success]);
    
  const [showPasswordfirst, setShowPasswordfirst] = useState(false);
  const handleClickShowPasswordfirst = () => setShowPasswordfirst(!showPasswordfirst);
  const handleMouseDownPasswordfirst = () => setShowPasswordfirst(!showPasswordfirst);

  const [showPasswordsecond, setShowPasswordsecond] = useState(false);
  const handleClickShowPasswordsecond = () => setShowPasswordsecond(!showPasswordsecond);
  const handleMouseDownPasswordsecond = () => setShowPasswordsecond(!showPasswordsecond);

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
                Reset Password
              </Typography>
            </Box>
           
            <form
              noValidate
              autoComplete="off"
              style={{padding:"0px"}}
              encType="multipart/form-data"
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}

            >
              
              
              <TextField
              
              autoFocus
              fullWidth
                label="New Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{marginTop:"10px" }}
                type={showPasswordfirst ? "text" : "password"} 
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end" >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordfirst}
                        onMouseDown={handleMouseDownPasswordfirst}
                      >
                        {showPasswordfirst ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
              
              autoFocus
              fullWidth
                label="Confirmed Password"
                variant="outlined"
                
                
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{marginTop:"15px", marginBottom:"15px"}}
                type={showPasswordsecond ? "text" : "password"} 
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordsecond}
                        onMouseDown={handleMouseDownPasswordsecond}
                      >
                        {showPasswordsecond ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                fullWidth
                size="large"
                variant="contained"
                type="submit"
                value="Update"
                className="forgotPasswordBtn"
                sx={{ marginBottom: 2 }}
              >
                Reset Password
              </Button>
              
            </form>
          </CardContent>
        </Card>
      </Box>
        </>
      ) }
      
    </>
  );
};

export default ProResetPassword;
