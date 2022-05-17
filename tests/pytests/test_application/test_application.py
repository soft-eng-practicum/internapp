import random
import string

import pytest
from selenium.webdriver.common.keys import Keys


@pytest.mark.usefixtures("driver", "logger")
class Test_Application:
    # Application data
    application_email = "test_application@pytest.com"
    application_email_password = "123456"
    application_signature = "".join(
        random.choice(string.ascii_lowercase) for _ in range(10)
    )

    def test_bio_application(self, server):
        # Login with premade applicant
        self.driver.get(server + "/login")
        self._login()

        # Set bio application's signature and printed name to randomly generated string
        self.driver.get(server + "/editBIO")
        self._set_signatures()

        # Assert bio applicant's signature and printed name is the randomly generated string
        self.driver.get(server + "/home")
        self._check_signatures("bio")

    def test_itec_application(self, server):
        # Login with premade applicant
        self.driver.get(server + "/login")
        self._login()

        # Set itec application's signature and printed name to randomly generated string
        self.driver.get(server + "/editITEC")
        self._set_signatures()

        # Assert itec applicant's signature and printed name is the randomly generated string
        self.driver.get(server + "/home")
        self._check_signatures("itec")

    def _login(self):
        username_field = self.driver.find_element_by_xpath("//*[@id='emailTxt']")
        username_field.send_keys(self.application_email)
        password_field = self.driver.find_element_by_xpath("//*[@id='passwordTxt']")
        password_field.send_keys(self.application_email_password)
        password_field.send_keys(Keys.RETURN)

    def _set_signatures(self):
        signature_field = self.driver.find_element_by_xpath("//*[@id='signatureTxt']")
        signature_field.send_keys(Keys.CONTROL + "a")
        signature_field.send_keys(Keys.DELETE)
        signature_field.send_keys(self.application_signature)
        printed_field = self.driver.find_element_by_xpath("//*[@id='printedTxt']")
        printed_field.send_keys(Keys.CONTROL + "a")
        printed_field.send_keys(Keys.DELETE)
        printed_field.send_keys(self.application_signature)
        printed_field.send_keys(Keys.RETURN)

    def _check_signatures(self, app_type):
        """Adding this because I forgot. This is for View Document Details, not Edit Document,
        to verify that the signatures are the same."""
        if app_type == "bio":
            app_row = 1
            sig_row = 37
        elif app_type == "itec":
            app_row = 2
            sig_row = 22
        self.driver.find_element_by_xpath(
            "//*[@id='applicationTableOnHomePage']/table/tbody/tr["
            + str(app_row)
            + "]/td[4]/a/span"
        ).click()
        applicant_signature = self.driver.find_element_by_xpath(
            "/html/body/div/div[2]/table[1]/tbody/tr[" + str(sig_row) + "]/td[2]"
        ).text
        applicant_printed_name = self.driver.find_element_by_xpath(
            "/html/body/div/div[2]/table[1]/tbody/tr[" + str(sig_row + 1) + "]/td[2]"
        ).text
        assert (
            self.application_signature == applicant_signature
            and self.application_signature == applicant_printed_name
        ), "Signatures do not match"
