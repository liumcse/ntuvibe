from setuptools import setup, find_packages
from datetime import datetime

setup(
    name='scraper',
    version=str(datetime.now()),
    packages=find_packages(),
    python_requires='>=3.6',
    py_modules=['scraper'],
    install_requires=[
        'Click',
        'beautifulsoup4',
        'requests',
    ],
    entry_points={
        'console_scripts': [
            'scraper=scraper:cli'
        ]
    }
)
