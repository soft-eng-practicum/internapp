*** Settings ***
Documentation    Test that is verifying the opening of Google.com Checks if the installation is correct. 

Library    SeleniumLibrary

*** Variables ***
${adminUsername}    test@test.com
${adminPassword}    123456

*** Test Cases ***
# Opens a browser with a given Url "localhost:8000" with a specific driver "Chrome"
Open Home Page
    Open Browser    http://localhost:8000/    chrome
    Maximize Browser Window
    Sleep    2s
Move to Login Page
#This is the click function at a given xpath, more specifically the button the goto the login page
    Mouse Down    xpath:/html/body/div/div/a[1]
    Mouse Up    xpath:/html/body/div/div/a[1]

Attempt to Login With Credentials
#passes the password variables into the xpath locations for username box and password box respectively. Then it clicks the login
    Sleep    2s
    Input Text    //*[@id="emailTxt"]    ${adminUsername}
    Input Text    //*[@id="passwordTxt"]    ${adminPassword}
    Mouse Down    //*[@id="loginBtn"]
    Mouse Up    //*[@id="loginBtn"]
