from bs4 import BeautifulSoup
import request_manager
from constants import NULL_TD_VALUE, INDEX_VACANCIES_INDEX, INDEX_VACANCIES_VACANCIES, INDEX_VACANCIES_WAITLIST

def isIndexRow(first_3_cells_of_row):
    cells_not_empty = map(lambda td: td.text != NULL_TD_VALUE, first_3_cells_of_row)
    return all(cells_not_empty)

def get(subj):
    res = request_manager.get_vacancies(subj)
    soup = BeautifulSoup(res, "html.parser")
    all_rows_except_header = soup.findAll("tr")[1:]
    first_3_cells_of_all_rows = map(lambda x : x.findAll("td")[:3], all_rows_except_header)
    first_3_cells_of_index_rows = filter(isIndexRow, first_3_cells_of_all_rows)
    first_3_texts_of_index_rows = map(lambda x : list(map(lambda y: y.text.strip(), x)), 
                                        first_3_cells_of_index_rows)
    vacancies_dict = {row[INDEX_VACANCIES_INDEX]:{"vacancies": row[INDEX_VACANCIES_VACANCIES], 
                                                    "waitlist": row[INDEX_VACANCIES_WAITLIST]} 
                        for row in first_3_texts_of_index_rows}
    return vacancies_dict

if __name__ == "__main__":
    print(get("CZ1006"))