from webapi.constants import PROFANITY_REPLACEMENT
from webapi.models import ReservedWordTab, CensoredWordTab


def get_all_reserved_words():
	return ReservedWordTab.objects.all()

def get_all_censored_words():
	return CensoredWordTab.objects.all()

def big_brother_watching(content):
	bad_words = get_all_censored_words()

	for word in bad_words:
		if word.value in content:
			content.replace(word.value, PROFANITY_REPLACEMENT)

	return content
