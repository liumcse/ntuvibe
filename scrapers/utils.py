import os
import time
import json
import datetime


def get_timestamp():
    return int(time.time())


def get_date_time(timestamp=get_timestamp()):
    return datetime.datetime.fromtimestamp(timestamp).strftime("%Y%m%d_%H%M%S")


def write_json_file(json_path_current, json_dict):
    """
    Write json_file to path specified by variable json_path_current.
    If file at json_path_current exists, rename the original file with its last updated time.
    :param json_path_current:
    :param json_dict: A JSON file to be written
    :return:
    """

    if not os.path.exists(os.path.dirname(json_path_current)):
        os.makedirs(os.path.dirname(json_path_current))

    if os.path.exists(json_path_current):
        last_updated = int(os.path.getmtime(json_path_current))
        date_time_str = get_date_time(timestamp=last_updated)
        json_path_old = json_path_current + "." + date_time_str
        os.rename(src=json_path_current, dst=json_path_old)

    write_json = open(json_path_current, "wb+")
    write_json.write(json.dumps(json_dict, ensure_ascii=False, indent=2).encode('utf8'))
