from bs4 import BeautifulSoup
from scrapers import request_manager
from scrapers.constants import NULL_TD_VALUE, INDEX_VACANCIES_INDEX, INDEX_VACANCIES_VACANCIES, INDEX_VACANCIES_WAITLIST


def _is_index_row(first_3_cells_of_row):
	cells_not_empty = map(lambda td: td.text != NULL_TD_VALUE, first_3_cells_of_row)
	return all(cells_not_empty)


def get_course_vacancy_by_request(course_code):
	res = request_manager.get_course_vacancy(course_code)
	soup = BeautifulSoup(res, "html.parser")
	all_rows_except_header = soup.findAll("tr")[1:]
	first_3_cells_of_all_rows = map(lambda x: x.findAll("td")[:3], all_rows_except_header)
	first_3_cells_of_index_rows = filter(_is_index_row, first_3_cells_of_all_rows)
	first_3_texts_of_index_rows = map(lambda x: list(map(lambda y: y.text.strip(), x)), first_3_cells_of_index_rows)
	vacancies_dict = {
		row[INDEX_VACANCIES_INDEX]: {
			"vacancy": int(row[INDEX_VACANCIES_VACANCIES]),
			"waitlist": int(row[INDEX_VACANCIES_WAITLIST]),
		}
		for row in first_3_texts_of_index_rows
	}
	return vacancies_dict
