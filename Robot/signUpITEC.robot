*** Settings ***
Documentation    Automated signup and creation of a mock student and all its credentials
Suite Setup    Setup

#@ symbol in robot represents a list
Library    SeleniumLibrary
Library    Collections

*** Variables ***
${serialNum}
${mockFirstName}    Mock Human
${mockLastName}     Last Name
${email}    mock@ggc.edu
${mockEmail}    ${serialNum}${email}
${mockPassword}    fakePass123
${mockStudentNum}    900100000
${mockPhone}    7700000000
${mockAddress}    1000 University Parkway
${mockCity}    Lawrenceville
${mockState}    Georgia
${mockZip}    30043

*** Keywords ***
#
Setup
    ${alphabet}    Create List    a    b    c    d    e    f    g    h    i    j    k    l    m    n    o
    ...    p    q    r    s    t    u    v   w    x    y    z
    ${randomizerAlphabet}    Evaluate    random.randint(0,26)
    ${randLetter}    Get From List    ${alphabet}    ${randomizerAlphabet}
    ${serialNum}    Evaluate    random.randint(0,10000)
    Set Suite Variable    ${mockEmail}    ${randLetter}${serialNum}${email}

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
#Open Home Page
Signup ITEC Student
    Open Browser    http://localhost:8000/    chrome
    Maximize Browser Window
#Select Signup from Home
    Mouse Down    xpath:/html/body/div/div/a[2]
    Mouse Up    xpath:/html/body/div/div/a[2]
    Input New User Credentials at Signup
#Click on signup Button to confirm
    Mouse Down    xpath:/html/body/div/div/form/button
    Mouse Up    xpath:/html/body/div/div/form/button
#Select Signup as ITEC Option
    Select From List By Label    application    Information Technology Internship (ITEC 4900)
    Select Checkbox    //*[@id="itBox"]
 #Click sign up button via xpaths
    Mouse Down    xpath:/html/body/div/div/div/div[3]/input
    Mouse Up    xpath:/html/body/div/div/div/div[3]/input
#Signup at ITEC Page
#Mentor Phone
    Input Text    //*[@id="phonenumberTxt"]    770-999-9999
#Student Academic info
#Selecting Fall from the drop down at http://localhost:8000/itec
    Select From List By Label     proposedinternsemester    Fall
#selects fall 2022 from the drop down on http://localhost:8000/itec
    Select From List By Label    proposedinternyear    2022
#Expected Graduation Date
    Select From List By Label    expectedGraduationSemester    Fall
#Expected Grad year
    Select From List By Label    expectedGraduationYear    2022
#Student Concentration
    Select From List By Label    major    Software Development
#Student Classification
    Select From List By Label    classification    Senior
#Overall GPA
    Input Text    //*[@id="gpaTxt"]    3.50
#Program GPA
    Input Text    //*[@id="itecGPATxt"]    3.50
#Mentor Fields
    Input Text   //*[@id="mentorNameTxt"]    Cengiz & Rahaf
#Describe your interests
    Input Text    //*[@id="textArea"]    I love playing Piano and singing
#What internship are you looking for?
    Input Text    //*[@id="interestTxt"]    I would be open to anything
#Programming or Software Development focused internship?
    Select From List By Label    focusonsoftdev    Yes
#Company Intern experience?
    Select From List By Label    proposedList    Yes
#Signature and review
    Input Text    //*[@id="signatureTxt"]    Testing Rules
    Input Text    //*[@id="printedTxt"]     Testing Rules
#Click submit
    Mouse Down    //*[@id="submitBtn"]
    Mouse Up    //*[@id="submitBtn"]
