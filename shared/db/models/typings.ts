/** Type definition of course. */
export interface CourseType {
  course_code: string;
  au: number;
  course_title: string;
  constraint: {
    prerequisite: string[];
    na_to: string[];
    na_to_all: string[];
    mutex: string;
  };
  as_ue?: boolean;
  as_pe?: boolean;
  pass_fail: boolean;
  semesters: string[];
  description: string;
  last_update: Date;
  postgrad: boolean;
}

export interface AdditionalInfo {
  as_ue: boolean;
  as_pe: boolean;
}

/** Type definition of class schedule. */
export interface ClassScheduleType {
  course_code: string;
  schedules: {
    class_index: string;
    class_type: string;
    class_group: string;
    start_time: string;
    end_time: string;
    venue: string;
    day: 1 | 2 | 3 | 4 | 5 | 6;
    weeks: number[];
  }[];
}
