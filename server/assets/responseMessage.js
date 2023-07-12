module.exports = {

	// PROPERTY responseMessage............
	OTP_SEND: 'OTP has been sent successfully on register email. ',
	OTP_EXPIRED: 'OTP time expired.',
	INCORRECT_OTP: 'Incorrect OTP provided.',
	BLOCK_BY_ADMIN: 'You have been blocked by admin.',
	DELETE_BY_ADMIN: 'Your account has been deleted by admin.',
	NO_TOKEN: 'Please provide token.',
	NO_IMG: 'Please provide Photo.',
	LOGIN: 'Login successfully.',
	OTP_VERIFY: 'OTP verified successfully.',
	USER_ALREADY_EXIST: 'User already Registerd.',
	USER_NOT_FOUND: 'User not found.',
	AGENT_NOT_FOUND: 'Agent not found.',
	UNAUTHORIZED: ' Unauthorozed User.',
	INCORRECT_LOGIN: "Incorrect Credentials Provided",
	OTP_NOT_VERIFYED: "Credentials OTP not Verifyed",
	PROFILE_UPDATED: 'Profile updated successfully.',
	USER_EXISTS: 'User already Registerd.',
	AGENT_EXISTS: 'Agent already Registerd.',
	MOBILE_EXIST: 'This mobile number already exists.',
	EMAIL_EXIST: 'This email already exists.',
	USER_DETAILS: 'Profile details found successfully.',
	AGENT_DETAILS: 'Agent details found successfully.',
	AGENT_APROVED: 'Agent Aproved successfully.',
	AGENT_REJECTED: 'Agent Rejected successfully.',
	REQUEST_LIST_NOT_FOUND: 'Request List not found.',
	NOTFICATION_NOT_FOUND: 'Request List not found.',
	NOTIFICATION_FOUND: 'Request List not found.',
	REQUEST_LIST_FOUND: 'Request List found successfully.',
	ASSIGMENT_ASSIGN: 'Assigment assign successfully.',
	USER_CREATED: 'User Registerd successfully.',
	AGENT_CREATED: 'Agent Registerd successfully.',
	NOT_MATCH: "Password and confirm password Don't match",
	PWD_NOT_MATCH: "Old Password Don't match",
	PWD_CHANGED: "Password Updated successfully",
	AGENT_NOT_TRUE: "Application is pending at admin",
	AGENT_REJECT: "Application is Rejected by admin",



	// PROPERTY responseMessage............
	PROPERTY_ALREADY_ADD: "Property is already exist.",
	PROPERTY_ADD: "Property Posted successfully",
	PROPERTY_NOT_FOUND: "Property Not found",
	PROPERTY_FOUND: "Property found successfully",
	NOT_WISHLIST: "Unable to wishlist the Property",
	WISHLIST: "Wishlist the Property",
	WISHLIST_REMOVED: "Removed Property from wishlist",
	WISHLIST_NOT_FOUND: "Wishlist not found",
	WISHLIST_FOUND: "Wishlist found successfully",
	COMMENT_ADD: "Comment Add successfully..",
	COMMENT_NOT_FOUND : "Comment Not found",
	COMMENT_FOUND : "Comment found successfully..",
	REQUEST_SENT : "Request Sent. We will connect you soon",

	// Message Managment....................
	MESSAGE_CRATED: "Message sent successfully",

	// Notification MANAGEMENT
    NOTIFICATION_ADD :"Notification added successfully..",
	NOTIFICATION_VIEW :"Notification view successfully..",
	NOTIFICATION_NOT_FOUND : "Notification not found",
	NOTIFICATION_DELETE :"Notification Delete successfully..",



	SMS_BODY: (otp) => `Your verification code is  ${otp}`,
	REFER_SMS_BODY: (first_name, last_name, referral_code, iosLink, androidLink, webLink) => `${first_name} ${last_name} wants to refer you on PayPenny application. 
	Please use ${referral_code} as the referral code. Website Link : ${webLink}, Android Link : ${androidLink}, IOS Link : ${iosLink}`
};
