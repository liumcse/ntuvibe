import click
from crawlers.course_content_crawler import CourseContentCrawler


@click.group()
def cli():
    pass


@click.command()
@click.option('--semester', help='target semester; e.g. 2020_1')
@click.argument('target')
def crawl(semester: str, target: str):
    """Crawls information from NTU website and outputs in JSON format."""
    print("Crawl called, semester is", semester, ", target is", target)
    if target == 'course_content':
        crawler = CourseContentCrawler()
        print(crawler.crawl())
    else:
        raise Exception('Invalid parameter')


# Add commands to CLI
cli.add_command(crawl)

if __name__ == '__main__':
    cli()
