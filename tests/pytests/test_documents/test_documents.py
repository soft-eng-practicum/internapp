from time import sleep
import os

import pytest
from selenium.common.exceptions import NoSuchElementException


@pytest.mark.usefixtures("driver", "logger")
class Test_Documents:
    def test_document_ops(self, server, document, tmp):
        doc_path = document[0]
        doc_count = document[1]

        self._doc_upload(doc_count, doc_path)
        self.driver.get(server + "/home")
        self._doc_download(doc_count, tmp)
        self.driver.get(server + "/home")
        self._doc_delete(doc_count)

    def _doc_upload(self, doc_count, doc_path):
        try:
            doc_exists = self.driver.find_element_by_xpath(
                '//*[@id="documentTableOnHomePage"]/div[1]/table/tbody/tr['
                + doc_count
                + "]/td[7]/a/span"
            ).is_displayed()
            if doc_exists:
                self.logger.warning("A document already exists in row " + doc_count)
        except NoSuchElementException:
            self.logger.info("Document table is clear")

        self.driver.find_element_by_xpath(
            "//*[@id='uploadForm1']/div[1]/input"
        ).send_keys(doc_path)
        self.driver.find_element_by_xpath("//*[@id='uploadForm1']").click()
        self.driver.find_element_by_xpath("//*[@id='uploadResume']").click()
        sleep(3)

    def _doc_download(self, doc_count, tmp):
        assert self.driver.find_element_by_xpath(
            '//*[@id="documentTableOnHomePage"]/div[1]/table/tbody/tr['
            + doc_count
            + "]/td[7]/a/span"
        ).is_displayed(), ("No document exists in row " + doc_count + " to download")

        self.driver.find_element_by_xpath(
            '//*[@id="documentTableOnHomePage"]/div[1]/table/tbody/tr['
            + doc_count
            + "]/td[7]/a/span"
        ).click()
        # Probably need some sleep duration for this to work.
        sleep(3)
        if not (os.listdir(tmp.name)):
            assert False, "Tmp dir is empty!"

    def _doc_delete(self, doc_count):
        assert self.driver.find_element_by_xpath(
            '//*[@id="documentTableOnHomePage"]/div[1]/table/tbody/tr['
            + doc_count
            + "]/td[8]/a/span"
        ).is_displayed(), ("No document exists in row " + doc_count + " to delete")

        self.driver.find_element_by_xpath(
            '//*[@id="documentTableOnHomePage"]/div[1]/table/tbody/tr['
            + doc_count
            + "]/td[8]/a/span"
        ).click()
