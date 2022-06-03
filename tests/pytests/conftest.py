import os
import glob
import tempfile
import sys
import logging

import pytest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

"""
pytest-xdist doesn't produce live logs without redirecting
stdout to stderr, even when log_cli is set to true. Running
pytest without -n (therefore vanilla pytest) produces live logs
appropriately, so it is only when running xdist this is needed.

Refer to this issue for additional information:
https://github.com/pytest-dev/pytest-xdist/issues/402
"""
sys.stdout = sys.stderr


def pytest_addoption(parser):
    parser.addoption("--server", action="store", default="localhost:8000")


def pytest_generate_tests(metafunc):
    test_docs = []
    for count, doc in enumerate(glob.glob(os.getcwd() + "/assets/documents/*")):
        test_docs.append((doc, str(count + 1)))
    if "document" in metafunc.fixturenames:
        metafunc.parametrize("document", test_docs)


@pytest.fixture(scope="session")
def server(request):
    return "http://" + request.config.getoption("--server")


@pytest.fixture(scope="session")
def logger(request):
    logger = logging.getLogger()
    session = request.node
    for item in session.items:
        cls = item.getparent(pytest.Class)
        setattr(cls.obj, "logger", logger)
    yield


@pytest.fixture(scope="session")
def tmp():
    # temp directory for doc downloads that gets cleaned up after tests are done
    tmp = tempfile.TemporaryDirectory(dir=os.getcwd())
    yield tmp
    tmp.cleanup()


@pytest.fixture(scope="session")
def driver(server, tmp, request):
    opts = webdriver.ChromeOptions()
    prefs = {
        "download.default_directory": tmp.name,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "plugins.always_open_pdf_externally": True,
    }
    opts.add_experimental_option("prefs", prefs)
    opts.headless = True
    opts.add_argument("--window-size=1920,1080")
    # opts.add_argument("start-maximized")
    web_driver = webdriver.Chrome(options=opts)
    web_driver.get(server + "/login")
    username = "admin@pytest.com"
    password = "#6x;46PFyK^z\\}v-"

    username_field = web_driver.find_element_by_xpath("//*[@id='emailTxt']")
    username_field.send_keys(username)
    password_field = web_driver.find_element_by_xpath("//*[@id='passwordTxt']")
    password_field.send_keys(password)
    password_field.send_keys(Keys.RETURN)
    session = request.node
    for item in session.items:
        cls = item.getparent(pytest.Class)
        setattr(cls.obj, "driver", web_driver)
    yield
    web_driver.close()
