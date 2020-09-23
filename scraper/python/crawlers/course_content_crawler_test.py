import unittest
from .course_content_crawler import CourseContentCrawler


class TestCourseContentCrawler(unittest.TestCase):
    def setUp(self):
        self.crawler = CourseContentCrawler()

    def test_crawl(self):
        result = self.crawler.crawl()
        self.assertTrue('semester' in result)
        self.assertTrue('data' in result)

    def test_crawl_semester_should_be_as_set(self):
        semester = '2019_2'
        result = self.crawler.crawl(semester)
        self.assertEqual(semester, result['semester'])


if __name__ == '__main__':
    unittest.main()
