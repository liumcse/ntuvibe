import requests
from constants import *


def get(url, *args, **kwargs):
    return requests.get(url, params=kwargs).text.encode('utf-8')

def post(url, headers, data, verify=False):
    return requests.post(url, data=data, headers=headers, verify=verify)

def get_vacancies(subj):
    return get(CHECK_VACANCIES_URL,
                subj=subj)