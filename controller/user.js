const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerModel = require('../model/tailor_user');
const { SECRET_KEY } = require('../config/config');
const nodemailer = require('nodemailer');
const otpModel = require("../model/otp");
const { ENUMS } = require('../utils/enums');
const { machineLearning } = require("firebase-admin");


exports.register = async (req, res) => {
  try {

    const email = req.body.email;
    const userData = await registerModel.findOne({ email: email, is_deleted: false });

    if (userData) {
      return res.status(404).json({
        "status": false,
        "message": ENUMS.USER.EMAIL_ID_EXIST
      });
    } else {
      const hashpassword = await bcryptjs.hash(req.body.password, 10);
      var datetime = new Date();
      var user = {
        shop_name: req.body.shop_name,
        owner_name: req.body.owner_name,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        image: req.body.image,
        password: hashpassword,
      };
      user.created_at = datetime;
      user.updated_at = datetime;
      user.is_deleted = false;
      user.is_active = true;

      const data = await registerModel.create(user);
      var accessToken = jwt.sign({ id: data.id, email: data.email }, SECRET_KEY);

      return res.status(200).json({
        id: data._id,
        shop_name: data.shop_name,
        owner_name: data.owner_name,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        image: data.image,
        token: accessToken
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: ENUMS.USER.USER_NOT_SAVED
    })
  }
};


exports.sendotp = async (req, res) => {
  try {
    const email = req.body.email;

    const existingUser = await registerModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: ENUMS.USER.EMAIL_ALREADY_EXIST
      });
    }

    let existingOTP = await otpModel.findOne({ email });


    if (existingOTP != null) {
      existingOTP.otp = generateOTP();
      await existingOTP.save();
      await sendVerificationEmail(email, existingOTP.otp);

    } else {
      const OTP = generateOTP();


      await otpModel.create({ email, otp: OTP });
      await sendVerificationEmail(email, OTP);
    }



    res.status(200).json({
      status: true,
      message: ENUMS.AUTHENTICATION.SEND_OTP,
    });
  } catch (error) {
    console.error('Error in sendotp:', error);
    res.status(500).json({
      status: false,
      message: ENUMS.AUTHENTICATION.INTERNAL_SERVER_ERROR,
    });
  }
};

exports.sendotppassword = async (req, res) => {
  try {
    const email = req.body.email;

    let existingOTP = await otpModel.findOne({ email });


    if (existingOTP != null) {
      existingOTP.otp = generateOTP();
      await existingOTP.save();
      await sendVerificationEmail(email, existingOTP.otp);

    } else {
      const OTP = generateOTP();


      await otpModel.create({ email, otp: OTP });
      await sendVerificationEmail(email, OTP);
    }



    res.status(200).json({
      status: true,
      message: ENUMS.AUTHENTICATION.SEND_OTP,
    });
  } catch (error) {
    console.error('Error in sendotp:', error);
    res.status(500).json({
      status: false,
      message: ENUMS.AUTHENTICATION.INTERNAL_SERVER_ERROR,
    });
  }
};
function generateOTP() {
  const digits = '0123456789';
  return Array.from({ length: 6 }, () => digits[Math.floor(Math.random() * 10)]).join('');
}

async function sendVerificationEmail(email, OTP) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'darzi.system.tech@gmail.com',
      pass: 'jgfg dkaz gxra kiai',
    },
  });

  const mailOptions = {
    from: 'darzi.system.tech@gmail.com',
    to: email,
    subject: 'verification',
    text: `Hello! Your Darzi verification code is: ${OTP}. Please enter this code to authenticate and access your account securely. This code will expire in 60 seconds. Thank you for using Darzi`,
  };

  await transporter.sendMail(mailOptions);
}


exports.verifyotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const userWithOTP = await otpModel.findOne({ email: email, otp: otp });

    if (userWithOTP) {
      res.status(200).json({
        status: true,
        message: ENUMS.AUTHENTICATION.VERIFY_OTP,
      });
    } else {
      res.status(400).json({
        status: false,
        message: ENUMS.AUTHENTICATION.INVALID_OTP,
      });
    }
  } catch (error) {
    console.error('Error in verifyotp:', error);
    res.status(500).json({
      status: false,
      message: ENUMS.AUTHENTICATION.INTERNAL_SERVER_ERROR,
    });
  }

}


exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await registerModel.findOne({ email: email, is_deleted: false });

    if (userData) {
      const passwordmatch = await bcryptjs.compare(password, userData.password);
      if (passwordmatch) {

        var accessToken = jwt.sign({ id: userData._id, email: userData.email }, SECRET_KEY);
        res.status(200).json({
          status: true,
          message: ENUMS.AUTHENTICATION.LOGIN_SUCCESS,
          accessToken,
          data: {
            id: userData._id,
            shop_name: userData.shop_name,
            owner_name: userData.owner_name,
            email: userData.email,
            mobile: userData.mobile,
            address: userData.address,
            image: userData.image,
          }
        })
      } else {
        res.status(402).json({
          status: false,
          message: ENUMS.USER.INCORRECT_PASSWORD
        })
      }

    } else {
      res.status(404).json({
        status: false,
        message: ENUMS.USER.INCORRECT_EMAIL
      })
    }
  } catch (error) {
    res.status(404).json({
      status: false,
      message: ENUMS.USER.SOMTHING_WENT_WRONG
    })

  }
}

exports.updateUser = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({
        status: false,
        message: ENUMS.USER.USER_ID_REQUIRED,
      });
    } else {
      const { id, ...updateData } = req.body;

      updateData.updated_at = Date.now();

      await registerModel.findByIdAndUpdate(id, updateData);

      const updateUser = await registerModel.findById(id);

      res.status(200).json({
        status: ENUMS.USER_STATUS_UPDATE_SUCCESSFULLY,
        result: {
          id: updateUser._id,
          shop_name: updateUser.shop_name,
          owner_name: updateUser.owner_name,
          mobile: updateUser.mobile,
          address: updateUser.address,
          image: updateUser.image,
          email: updateUser.email,
          updated_at: updateUser.updated_at,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: false,
      message: ENUMS.USER.SOMTHING_WENT_WRONG
    });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const updateid = { _id: req.body.id };

    const updateFields = {
      $set: {
        is_deleted: true,
        updated_at: req.body.updated_at || Date.now(),
      },
    };

    const deleteUser = await registerModel.findOneAndUpdate(
      updateid,
      updateFields,

      { new: true }
    );

    if (!deleteUser) {
      return res.status(404).json({
        status: false,
        message: ENUMS.USER.USER_NOT_FOUND,
      });
    }

    res.status(200).json({
      status: true,
      message: ENUMS.USER.USER_DETAILS_FETCHED_SUCCESSFULLY,
      // deleteUser: deleteUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: ENUMS.USER.SOMTHING_WENT_WRONG
    });
  }
};



exports.changePassword = async (req, res) => {
  try {
    const { email, new_password } = req.body;

    // Validate request body
    if (!email || !new_password) {
      return res.status(400).json({
        status: false,
        message: "Email is Required"
      });
    }

    const tailor = await registerModel.findOne({ email: email });
    console.log(tailor);
    if (!tailor) {
      return res.status(404).json({
        status: false,
        message: "Tailor not found."
      });
    }
    
    const hashedPassword = await bcryptjs.hash(new_password, 10);

    tailor.password = hashedPassword;
    await tailor.save();

    return res.status(200).json({
      status: true,
      message: "Password updated successfully."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
};
