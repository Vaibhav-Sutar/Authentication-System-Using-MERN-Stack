import { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader.js";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
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


const ProUpdatePassword = ({ history, location }) => {
    
    const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldShowPassword, setOldShowPassword] = useState(false);
  const handleClickShowPasswordOld = () => setOldShowPassword(!oldShowPassword);
  const handleMouseDownPasswordOld = () => setOldShowPassword(!oldShowPassword);

  const [newShowPassword, setNewShowPassword] = useState(false);
  const handleClickShowPasswordNew = () => setNewShowPassword(!newShowPassword);
  const handleMouseDownPasswordNew = () => setNewShowPassword(!newShowPassword);

  const [confirmedShowPassword, setConfirmedShowPassword] = useState(false);
  const handleClickShowPasswordConfirmed = () => setConfirmedShowPassword(!confirmedShowPassword);
  const handleMouseDownPasswordConfirmed = () => setConfirmedShowPassword(!confirmedShowPassword);
  


  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      history.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <>
    {loading ? (<Loader/>) :(
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
                Update Password
              </Typography>
            </Box>
           
            <form
              noValidate
              autoComplete="off"
              style={{padding:"0px"}}
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}

            >
              <TextField
                label="Old Password"
                variant="outlined"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                sx={{ marginBottom: "15px" ,width:"100%"}}
                type={oldShowPassword ? "text" : "password"} 
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordOld}
                        onMouseDown={handleMouseDownPasswordConfirmed}
                      >
                        {oldShowPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="New Password"
                variant="outlined"
                
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ marginBottom: "15px" ,width:"100%"}}
                type={newShowPassword ? "text" : "password"} 
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordNew}
                        onMouseDown={handleMouseDownPasswordNew}
                      >
                        {newShowPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirmed Password"
                variant="outlined"
                
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ marginBottom: "15px" ,width:"100%"}}
                type={confirmedShowPassword ? "text" : "password"} 
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirmed}
                        onMouseDown={handleMouseDownPasswordConfirmed}
                      >
                        {confirmedShowPassword ? <EyeOutline /> : <EyeOffOutline />}
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
                value="Send"
                className="forgotPasswordBtn"
                sx={{ marginBottom: 2 }}
              >
                Update
              </Button>
              
            </form>
          </CardContent>
        </Card>
      </Box>
      </>
    )}
      
    </>
  );
};

export default ProUpdatePassword;
