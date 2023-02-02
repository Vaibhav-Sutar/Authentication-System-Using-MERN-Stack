import { useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const ProForgotPassword = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                    Recover Password
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, marginBottom: 1.5 }}
                  >
                    Welcome 👋🏻
                  </Typography>
                  <Typography variant="body2">
                    Enter your mail
                  </Typography>
                </Box>
                <form
                  noValidate
                  autoComplete="off"
                  style={{ padding: "0px" }}
                  encType="multipart/form-data"
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
                  <TextField
                    autoFocus
                    fullWidth
                    id="name"
                    label="Email"
                    name="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: "15px" }}
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
                    Send
                  </Button>
                </form>
                <Box>
                <Typography variant="body2" sx={{
                    mb: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                <NavLink passHref to="/login"  style={{textDecoration: 'none',color:"#212121",fontSize:"16px"}}>
                Sign-In
                </NavLink>
              </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </>
  );
};

export default ProForgotPassword;
