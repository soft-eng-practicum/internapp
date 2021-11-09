*** Settings ***
Documentation    Automated signup and creation of a mock student and all its credentials 
#@ symbol in robot represents a list
Library    SeleniumLibrary

*** Variables ***
${serialNum}
${mockFirstName}    Mock Human
${mockLastName}     Last Name
${email}    new7mock@ggc.edu
${mockEmail}    ${serialNum}${email}
${mockPassword}    fakePass123
${mockStudentNum}    900100000
${mockPhone}    7700000000
${mockAddress}    1000 University Parkway
${mockCity}    Lawrenceville
${mockState}    Georgia
${mockZip}    30043

*** Keywords ***
#grabs all of the xpaths for the signup boxes and passes mock info into them
Input New User Credentials at Signup
#Email
    Input Text    //*[@id="emailTxt"]    ${mockEmail}
#Confirm email
    Input Text    //*[@id="cfmEmailTxt"]    ${mockEmail}
#Password
    Input Text    //*[@id="passwordTxt"]    ${mockPassword}
#Confirm password
    Input Text    //*[@id="cfmPasswordTxt"]    ${mockPassword}
#StudentID
    Input Text    //*[@id="studentIdTxt"]    ${mockStudentNum}
#First name
    Input Text    //*[@id="fnameTxt"]    ${mockFirstName}
#Last name
     Input Text    //*[@id="lnameTxt"]    ${mockLastName}
#Phone number
    Input Text    //*[@id="phone"]    ${mockPhone}
#Address
    Input Text    //*[@id="addressTxt"]    ${mockAddress}
#City
     Input Text    //*[@id="cityTxt"]    ${mockCity}
#State
    Input Text    //*[@id="stateTxt"]    ${mockState}
#ZIP
    Input Text    //*[@id="zipTxt"]    ${mockZip}



*** Test Cases ***
Open Home Page
    Open Browser    http://localhost:8000/    chrome
    Maximize Browser Window
Select Signup
    Mouse Down    xpath:/html/body/div/div/a[2]
    Mouse Up    xpath:/html/body/div/div/a[2]
    Input New User Credentials at Signup
#Click on signup
    Mouse Down    xpath:/html/body/div/div/form/button
    Mouse Up    xpath:/html/body/div/div/form/button
Select Signup as ITEC

#    Select From List By Label
    Select Checkbox    //*[@id="bioBox"]