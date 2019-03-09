VALID_EMAIL_DOMAIN = [
	'e.ntu.edu.sg',
	'ntu.edu.sg'
]

PROFANITY_REPLACEMENT = "***"


class StatusCode:  # (status_code:int, msg:str)
	SUCCESS = (200, "Success!")
	BUG_GENERAL = (500, "General Bug Found.")
	DUPLICATE_EMAIL = (400, "This Email has been registered.")
	DUPLICATE_USERNAME = (403, "This username has been registered.")
	DUPLICATE_RATING = (403, "You cannot rate twice on the same course.")
	BAD_USERNAME = (403, "You cannot use reserved or bad words in your username")

	NOT_LOGGED_IN = (401, "Not logged in.")
	NOT_ACTIVATED = (403, "The account has not been activated.")
	EMAIL_SENDING_FAIL = (403, "Email Sending Fail")

	MISSING_PARAMETER = (403, "Parameter Missing")
	INVALID_PARAMETER = (403, "Invalid Parameter")
	INVALID_COURSE_ID = (403, "Invalid Course ID")
	INVALID_ACTIVATION_TOKEN = (403, "Invalid or Expired Activation Token")
	INVALID_NTU_EMAIL = (403, "Please provide a valid NTU Email")
	INVALID_EMAIL_PASSWORD = (403, "Invalid Email or Password")

	NAME_TO_CODE = dict((k, v[0]) for k, v in locals().items() if isinstance(v, tuple))
	CODE_TO_NAME = dict((v, k) for k, v in NAME_TO_CODE.items())

	NAME_TO_MSG = dict((k, v[1]) for k, v in locals().items() if isinstance(v, tuple))
	MSG_TO_NAME = dict((v, k) for k, v in NAME_TO_MSG.items())

	CODE_TO_MSG = dict((v[0], v[1]) for v in locals().values() if isinstance(v, tuple))
	MSG_TO_CODE = dict((v, k) for k, v in CODE_TO_MSG.items())

	SORTED_CODE_LIST = sorted(NAME_TO_CODE.values())
