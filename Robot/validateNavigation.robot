*** Settings ***
Documentation    Test that Nav buttons take you to the correct Html locations
Library    SeleniumLibrary

*** Variables ***
${adminUsername}    test@test.com
${adminPassword}    123456

*** Keyword ***

*** Test Cases ***
#Open Home Page
Sigin with Adminpassword
    Open Browser    http://localhost:8000/    chrome
    Maximize Browser Window
Move to Login Page
#This is the click function at a given xpath, more specifically the button the goto the login page

    Mouse Down    xpath:/html/body/div/div/a[1]
    Mouse Up    xpath:/html/body/div/div/a[1]

Attempt to Login With Credentials
#passes the password variables into the xpath locations for username box and password box respectively. Then it clicks the login

    Input Text    //*[@id="emailTxt"]    ${adminUsername}
    Input Text    //*[@id="passwordTxt"]    ${adminPassword}
    Mouse Down    //*[@id="loginBtn"]
    Mouse Up    //*[@id="loginBtn"]

GGC Internapp Button Test
#Tests the button for the GGC Logo Icon

    Mouse Down    xpath:/html/body/nav/div/div[1]
    Mouse Up    xpath:/html/body/nav/div/div[1]
    Element Should Contain    xpath:/html/head/title    Admin/Instructor Home
Homepage Button Test
#Clicks the homepage dropdown and verifys addresses

