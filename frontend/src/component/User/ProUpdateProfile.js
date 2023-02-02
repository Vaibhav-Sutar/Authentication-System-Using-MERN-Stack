import { useState, useEffect } from "react";
import "../../App.css";
import Loader from "../layout/Loader/Loader.js";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CloudUpload from "mdi-material-ui/CloudUpload";
import Card from "@mui/material/Card";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";


const ProUpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
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
                    Update Profile
                  </Typography>
                </Box>
                
                <form
                  noValidate
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <TextField
                    autoFocus
                    fullWidth
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginBottom: "5px" }}
                  />
                  <TextField
                    autoFocus
                    fullWidth
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: "5px" }}
                  />

                  <div
                    id="registerImage"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      height: "73px",
                      marginTop: "15px",
                    }}
                  >
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      style={{
                        width: "70px",
                        objectFit: "cover",
                        height: "70px",
                        border: "4px solid rgb(137, 207, 240)",
                        borderRadius: "70px",
                      }}
                    />
                    <label class="custom-file-upload">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                      />
                      <CloudUpload
                        sx={{
                          width: "35px",
                          height: "35px",
                          color: "#1976d2",
                          marginLeft: "40%",
                          marginTop: "5%",
                        }}
                      />
                    </label>
                  </div>

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                    value="Update"
                    sx={{ marginBottom: 2, marginTop: "20px" }}
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

export default ProUpdateProfile;
