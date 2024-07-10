exports.ENUMS = {
    USER:{
        USER_NOT_FOUND: "User not found",
        USER_NOT_EXIST: "User does not exist",
        USER_NOT_SAVED: "User not saved",
        USER_DEACTIVATED:"User is deactivated",
        INVALID_USER: "User is invalid",
        EMAIL_ID_EXIST: "User already exist with this email id, Please Sign in",
        USER_DETAILS_FETCHED_SUCCESSFULLY:"User details fetched successfully",
        EMAIL_ALREADY_EXIST: "User already exist with this email id",
        USER_STATUS_UPDATE_SUCCESSFULLY:"User status update successfully",
        SOMTHING_WENT_WRONG:"somthing went wrong",
        USER_ID_REQUIRED:"user_id is required in req.body",
        INCORRECT_EMAIL: 'Invalid email',
        INCORRECT_PASSWORD:'Invalid password',
        INTERNAL_SERVER_ERROR:'internal server error'


    },

    AUTHENTICATION:{
        LOGIN_SUCCESS: "Logged in successfully.",
        TOKEN_EXPIRED: "Token has been expired",
        TOKEN_GENERATED:"Token is generated",
        TOKEN_REQUIRED: "Required token",
        TOKEN_ADD_SUCCESS: "Token add successfully",
        LOGOUT_SUCCESS: "Logout successfully",
        INVALID_TOKEN: 'Invalid token',
        PLEASE_ENTER_OTP: "Please enter your OTP",
        VERIFY_OTP: "Please verify otp",
        INVALID_OTP: 'Invalid token',
        NAME_REQUIRED: "Name is Required",
        REQUIRED_OTP: "OTP Required",
        SEND_OTP:"otp send success full",
        OTP_LENGTH_VALIDATION: "OTP length should be 4 digit",
        REQUIRED_USER_ID: "UserId Required",
        CODE_NOT_MATCH: "Code is not match",
        SOMTHING_WENT_WRONG:"somthing went wrong"
    },

    ORDER:{
        FIELD_REQUIRED:"Required field",
        DATA_INSERT_SUCCESS:"data insert successfully",
        TAILOR_ID_REQUIRED:"tailor_id is required",
        ORDER_DETAILS_FETCHED_SUCCESSFULLY:"order details fetched successfully",
        CUSTOMER_ID_REQUIRED:"customer_id is required",
        EMPLOYEE_ID_REQUIRED:"employee_id is required",
        ORDER_ID_REQUIRED:"order_id is required in req.body",
        ORDER_STATUS_UPDATE_SUCCESSFULLY:"order status update successfully",
        ORDER_NOT_FOUND:"order not found",
        ORDER_STATUS_DELETE_SUCCESSFULLY:"order status delete successfully",
        SOMTHING_WENT_WRONG:"somthing went wrong"
    },

    MEASUREMENT:{
        MEASUREMENT_DETAILS_FETCHED_SUCCESSFULLY:"measurement details fetched successfully",
        SOMTHING_WENT_WRONG:"somthing went wrong",
        DATA_INSERT_SUCCESS:"data insert successfully",
        FIELD_REQUIRED:"Required field",
        MEASUREMENT_ID_REQUIRED:"measurements_id is required in req.body",
        MEASUREMENT_STATUS_UPDATE_SUCCESSFULLY:"measurement status update successfully",
        MEASUREMENT_STATUS_DELETE_SUCCESSFULLY:"measurement status delete successfully",
        TAILOR_ID_REQUIRED:"tailor_id is required",
        INVALID_TAILOR_iD:"tailor_id is invalid",
        MEASUREMENT_NOT_FOUND:"measurement not found",
    },

    INVENTORY:{
        FIELD_REQUIRED:"Required field",
        DATA_INSERT_SUCCESS:"data insert successfully",
        SOMTHING_WENT_WRONG:"somthing went wrong",
        INVENTORY_DETAILS_FETCHED_SUCCESSFULLY:"inventory details fetched successfully",
        INVENTORY_ID_REQUIRED:"inventory_id is required in req.body",
        INVENTORY_STATUS_UPDATE_SUCCESSFULLY:"inventory status update successfully",
        INVENTORY_NOT_FOUND:"inventory not found",
        INVENTORY_STATUS_DELETE_SUCCESSFULLY:"inventory status delete successfully",
        TAILOR_ID_REQUIRED:"tailor_id is required",
        INVALID_TAILOR_iD:"tailor_id is invalid"
    },

    EMPLOYEE:{
        EMAIL_ALREADY_EXIST: "User already exist with this email id",
        SOMTHING_WENT_WRONG:"somthing went wrong",
        LOGIN_SUCCESS: "Logged in successfully.",
        INCORRECT_EMAIL: 'Invalid email',
        INCORRECT_PASSWORD:'Invalid password',
        EMPLOYEE_DETAILS_FETCHED_SUCCESSFULLY:"employee details fetched successfully",
        EMPLOYEE_STATUS_UPDATE_SUCCESSFULLY:"employee status update successfully",
        EMPLOYEE_STATUS_DELETE_SUCCESSFULLY:"employee status delete successfully",
        FIELD_REQUIRED:"Required field",
        EMPLOYEE_ID_REQUIRED:"employee_id is required in req.body",
        USER_NOT_FOUND: "User not found",
        TAILOR_ID_REQUIRED:"tailor_id is required",
        INVALID_TAILOR_iD:"tailor_id is invalid",
        GET_DATA_SUCCESSFULLY:"get data successfully"

    },

    CUSTOMER_MEASUREMENT:{
        FIELD_REQUIRED:"Required field",
        DATA_INSERT_SUCCESS:"data insert successfully",
        SOMTHING_WENT_WRONG:"somthing went wrong",
        CUSTOMER_MEASUREMENT_DETAILS_FETCHED_SUCCESSFULLY:" customer_measurement details fetched successfully",
        CUSTOMER_MEASUREMENT_ID_REQUIRED:"customer_measurement_id is required in req.body",
        CUSTOMER_MEASUREMENT_STATUS_UPDATE_SUCCESSFULLY:"customer_measurement status update successfully",
        CUSTOMER_MEASUREMENT_STATUS_DELETE_SUCCESSFULLY:"customer_measurement status delete successfully",
        CUSTOMER_ID_REQUIRED:"customer_id is required",
        INVALID_CUSTOMER_ID:"customer_id is invalid",
        CUSTOMER_MEASUREMENT_NOT_FOUND: "customer_measurement not found",
        GET_DATA_SUCCESSFULLY:"get data successfully"

    },

    CUSTOMER:{
        FIELD_REQUIRED:"Required field",
        SOMTHING_WENT_WRONG:"somthing went wrong",
        DATA_INSERT_SUCCESS:"data insert successfully",
        TAILOR_ID_REQUIRED:"tailor_id is required in req.body",
        GET_DATA_SUCCESSFULLY:"get data successfully",
        CUSTOMER_ID_REQUIRED:"customer_id is required in req.body",
        CUSTOMER_STATUS_UPDATE_SUCCESSFULLY:"customer status update successfully",
        CUSTOMER_STATUS_DELETE_SUCCESSFULLY:"customer status delete successfully",
        CUSTOMER_NOT_FOUND: "customer not found",
        TAILOR_ID_REQUIRED:"tailor_id is required",
        INVALID_TAILOR_iD:"tailor_id is invalid",
    }
}
