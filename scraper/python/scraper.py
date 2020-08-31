import click
import json
import os
import pathlib
from crawlers.course_content_crawler import CourseContentCrawler
from crawlers.class_schedule_crawler import ClassScheduleCrawler


@click.group()
def cli():
    """A placer function that groups commands together."""
    pass


@click.command()
@click.option('--semester', help='target semester; e.g. 2020_1')
@click.argument('target')
def crawl(semester: str, target: str):
    """Crawls information from NTU website and outputs in JSON format."""
    if target == 'course_content':
        crawler = CourseContentCrawler()
        sanitized = json.dumps(crawler.crawl(semester), sort_keys=False, indent=4)
        with open(os.path.join(os.getcwd(), 'output/course_content.json'), 'w+') as f:
            f.write(sanitized)
    elif target == 'class_schedule':
        crawler = ClassScheduleCrawler()
        sanitized = json.dumps(crawler.crawl(semester), sort_keys=False, indent=4)
        with open(os.path.join(os.getcwd(), 'output/class_schedule.json'), 'w+') as f:
            f.write(sanitized)
    else:
        raise Exception('Invalid parameter')


# Add commands to CLI
cli.add_command(crawl)

if __name__ == '__main__':
    cli()
