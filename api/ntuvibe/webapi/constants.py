DEFAULT_COURSE_LIST_OFFSET = 0
DEFAULT_COURSE_LIST_LIMIT = 30
VALID_EMAIL_DOMAIN = [
	'e.ntu.edu.sg',
	'ntu.edu.sg'
]


class StatusCode:  # (status_code:int, msg:str)
	SUCCESS = (200, "Success!")
	BUG_GENERAL = (450, "General Bug Found.")
	DUPLICATE_EMAIL = (451, "This Email has been registered.")
	DUPLICATE_USERNAME = (452, "This username has been registered.")
	NOT_LOGGED_IN = (453, "You have not logged in.")
	NOT_ACTIVATED = (454, "The account has not been activated.")
	EMAIL_SENDING_FAIL = (455, "Email Sending Fail")

	MISSING_PARAMETER = (470, "Parameter Missing")
	INVALID_PARAMETER = (471, "Invalid Parameter")
	INVALID_COURSE_ID = (472, "Invalid Course ID")
	INVALID_ACTIVATION_TOKEN = (473, "Invalid or Expired Activation Token")
	INVALID_NTU_EMAIL = (474, "Please provide a valid NTU Email")
	INVALID_EMAIL_PASSWORD = (475, "Invalid Email or Password")

	NAME_TO_CODE = dict((k, v[0]) for k, v in locals().items() if isinstance(v, tuple))
	CODE_TO_NAME = dict((v, k) for k, v in NAME_TO_CODE.items())

	NAME_TO_MSG = dict((k, v[1]) for k, v in locals().items() if isinstance(v, tuple))
	MSG_TO_NAME = dict((v, k) for k, v in NAME_TO_MSG.items())

	CODE_TO_MSG = dict((v[0], v[1]) for v in locals().values() if isinstance(v, tuple))
	MSG_TO_CODE = dict((v, k) for k, v in CODE_TO_MSG.items())

	SORTED_CODE_LIST = sorted(NAME_TO_CODE.values())


try:
	raise Exception(StatusCode.SUCCESS)
except Exception as ex:
	a, b = ex.args[0]
	print(a)
	print(type(a))
	print(b)
	print(type(b))

