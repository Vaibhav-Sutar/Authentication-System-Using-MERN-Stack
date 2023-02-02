# Authentication System Using MERN Stack

Hi, everyone In this project I have created Authentication System using MERN Stack. 


https://user-images.githubusercontent.com/78019203/216244814-2119db06-3ad0-4971-a985-828844fb5d90.mp4


# Features
- Registration
- Login
- Update Profile
- Update Password
- Forgot Password
- Reset Password
- Logout


# Step to run the application

1) Download the source code now place these source code in one folder suppose it's name is MERN_AUTH. Now run the **npm install** in terminal of that MERN_AUTH folder.
2)  Now go inside of frontend folder using **cd frontend** command now again run **npm install** in terminal of frontend folder
3) Now add the config.env file inside of config folder of backend. Here we have to add Following environment variable 
 
PORT =  Add the port number\n\n
DB_URI =  Add the mongodb url
CLOUDINARY_NAME = Add the name which you get after creating account on cloudinary
CLOUDINARY_API_KEY = Add its API key
CLOUDINARY_API_SECRET = Add Secret Key
RESET_PASSWORD_FRONTEND_URL = It is only to test reset password
JWT_SECRET = Add Secret key for password hashing
JWT_EXPIRE = Expiry time for jwt
COOKIE_EXPIRE = Expiry time for cookie
SMTP_SERVICE = like gmail
SMPT_HOST = like smtp.gmail.com
SMPT_PORT= 465
SMTP_MAIL = Add the mail of sender 
SMTP_PASSWORD = Add random password 
