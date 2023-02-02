import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import AccountCircleIcon from "mdi-material-ui/AccountCircle";
import EmailIcon from "mdi-material-ui/Email";
import Card from "@mui/material/Card";
import Loader from "../layout/Loader/Loader";

const ProProfile = ({ history }) => {
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  function logoutUser() {
    {loading ? (<Loader/>) : (
      dispatch(logout())
    )}
    
  }
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

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
        <Card sx={{ zIndex: 1, width: "40rem" }}>
          <CardContent sx={{ padding: "2rem" }}>
            <Box
              sx={{
                mb: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                id="registerImage"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  style={{
                    width: "109px",
                    objectFit: "cover",
                    height: "109px",
                    border: "5px solid #1976d2",
                    borderRadius: "70px",
                  }}
                />
              </div>
            </Box>
            <Box
              sx={{
                mt: 5,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={logoutUser}
                sx={{ marginLeft: 2, height: "52px", width: "200px" }}
              >
                Logout
              </Button>
            </Box>
            <Box
              sx={{
                mt: 5,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                fullWidth
                size="medium"
                type="submit"
                variant="contained"
                sx={{ marginLeft: 2, height: "52px" }}
              >
                <NavLink
                  to="/me/update"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Update Profile
                </NavLink>
              </Button>
              <Button
                fullWidth
                size="medium"
                type="submit"
                variant="contained"
                sx={{ marginLeft: 2, height: "52px" }}
              >
                <NavLink
                  to="/password/update"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Update Password
                </NavLink>
              </Button>
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "row", marginTop: "5%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "45%",
                  marginLeft: "12px",
                }}
              >
                <AccountCircleIcon sx={{ height: "30px", width: "30px" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, marginLeft: "10px" }}
                >
                  {user.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "12px",
                }}
              >
                <EmailIcon sx={{ height: "30px", width: "30px" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, marginLeft: "5px" }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
        </>
      )}
      
    </>
  );
};

export default ProProfile;
