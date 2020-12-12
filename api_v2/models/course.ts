import { getDbInstance } from "../libs/db";

type CourseSnippet = {
  course_code: string;
  course_title: string;
  postgrad: boolean;
};

type CourseDetail = {
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
};

export async function getAllCourseSnippet(): Promise<Array<CourseSnippet>> {
  // Connect to Db and get collection
  const db = await getDbInstance();
  const collection = db.collection("courses");

  // Query database
  const result: Array<CourseSnippet> = await collection
    .aggregate<CourseSnippet>([
      {
        $project: {
          _id: 0,
          course_code: 1,
          course_title: 1,
          postgrad: 1,
        },
      },
    ])
    .toArray();

  // Return result
  return result;
}

export async function getCourseDetailByCourseCode(
  courseCode: string
): Promise<CourseDetail | null> {
  // Connect to Db and get collection
  const db = await getDbInstance();
  const collection = db.collection("courses");

  // Pre-process course code
  courseCode = courseCode.toUpperCase();

  // Query database
  const result = await collection.findOne<CourseDetail | null>(
    {
      course_code: courseCode,
    },
    {
      projection: {
        _id: 0,
      },
    }
  );

  return result;
}

/**
 * Returns an array of course snippets in which course titles match the regex.
 * Currently, only supports title matching; TODO: add description matching in the future.
 * @param query regex
 */
export async function getCourseSnippetByRegex(
  query: string
): Promise<Array<CourseSnippet>> {
  if (!query || query.trim().length <= 1) {
    return [];
  }

  // Connect to Db and get collection
  const db = await getDbInstance();
  const collection = db.collection("courses");

  // Build regex
  const keywords: string[] = query.trim().split(" ");
  const regexPreBuild = keywords.map((val) => "(.*" + val + ".*)+").join("");
  const regex = RegExp(regexPreBuild, "i");

  // Search
  const result = collection
    .aggregate([
      {
        $match: { course_title: regex },
      },
      {
        $project: {
          _id: 0,
          course_code: 1,
          course_title: 1,
          postgrad: 1,
        },
      },
    ])
    .toArray();

  return result;
}
