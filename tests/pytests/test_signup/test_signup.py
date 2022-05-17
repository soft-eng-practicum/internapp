import random
import string

import pytest


@pytest.mark.usefixtures("driver", "logger")
class Test_Signup:
    # Signup form sample data
    email = (
        "".join(
            random.choice(string.ascii_lowercase + string.digits) for _ in range(12)
        )
        + "@pytest.com"
    )
    password = "".join(random.choice(string.ascii_lowercase) for _ in range(6))
    student_id = "9".join(random.choice(string.digits) for _ in range(8))
    first_name = "Selenium"
    last_name = "Test"
    address = "1000 Testing Ave"
    phone = "123-456-7897"
    city = "Testsite"
    state = "TS"
    zip_code = "10000"

    # Signup form ids set to sample data values
    signup_form = {
        "emailTxt": email,
        "cfmEmailTxt": email,
        "passwordTxt": password,
        "cfmPasswordTxt": password,
        "studentIdTxt": student_id,
        "fnameTxt": first_name,
        "lnameTxt": last_name,
        "addressTxt": address,
        "phone": phone,
        "stateTxt": city,
        "cityTxt": state,
        "zipTxt": zip_code,
    }

    def test_signup(self, server):
        self.driver.get(server + "/signup")
        for form_id, form_value in self.signup_form.items():
            form_field = self.driver.find_element_by_xpath('//*[@id="' + form_id + '"]')
            assert form_field.is_displayed(), "Can't find " + form_id
            self.driver.find_element_by_xpath('//*[@id="' + form_id + '"]').send_keys(
                form_value
            )
        self.driver.find_element_by_xpath('//*[@id="signupBtn"]').click()

        assert self.driver.current_url == server + "/home", "Was unable to get to /home"

        assert (
            self.driver.find_element_by_xpath("/html/body/div/h1").text
            == "Welcome " + self.first_name + "!"
        ), "Not seeing first name in welcome header on home page"
