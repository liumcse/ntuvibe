import re
from webapi.constants import PROFANITY_REPLACEMENT
from webapi.models import ReservedWordTab, CensoredWordTab


def get_all_reserved_words():
	return ReservedWordTab.objects.all()


def get_all_censored_words():
	return CensoredWordTab.objects.all()


def big_brother_watching(content):
	censored_words = get_all_censored_words()

	lower_case_content = content.lower()

	for word in censored_words:
		if word.value.lower() in lower_case_content:
			content = re.compile(re.escape(word.value.lower()), re.IGNORECASE).sub(PROFANITY_REPLACEMENT, content)

	return content
