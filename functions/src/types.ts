export interface Course {
  title: string;
  code: string;
  au?: string;
  description?: string;
  constraint?: {
    prerequisite?: string[];
    mutex?: string[];
  }
  as_ue?: boolean;
  as_pe?: boolean;
  pe_type?: string[];
  grade_type?: 0 | 1;
  offeredSemester?: string[];
}