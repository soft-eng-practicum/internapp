*** Settings ***
Documentation    Automated signup and creation of a mock Chemistry Intern and all its credentials
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
    Select From List By Label    application    Biology Internship (BIOL 4800)
    Select Checkbox    //*[@id="bioBox"]
    Mouse Down    xpath:/html/body/div/div/div/div[2]/input
    Mouse Up    xpath:/html/body/div/div/div/div[2]/input
Complete The Signup at Bio Page
#Selecting Fall from the drop down at http://localhost:8000/bio
    Select From List By Label     proposedinternsemester    Fall
#selects fall 2022 from the drop down on http://localhost:8000/bio
    Select From List By Label    proposedinternyear    2022
#Concentration Dropdown
    Select From List By Label    major    Biochemistry
#Expected Graduation Date
    Select From List By Label    expectedGraduationSemester    Fall
#Expected Grad year
    Select From List By Label    expectedGraduationYear    2022
#Overall GPA
    Input Text    //*[@id="gpaTxt"]    3.50
#Program GPA
    Input Text    //*[@id="programGPATxt"]    3.50
#Completed Bio Hours
    Input Text    //*[@id="hoursTxt"]    13
#Intended Profession
    Input Text    //*[@id="professionTxt"]    Testing


#Emergency Contact Info Section
#parent or legal guardian field
    Input Text    //*[@id="ecNameTxt"]    I Love You Momma
# Mailing address
    Input Text    //*[@id="ecAddressTxt"]    Momma's Address
#City
    Input Text    //*[@id="ecCityTxt"]    Momma's City
#State
    Input Text    //*[@id="ecStateTxt"]    Momma's State
#ZipCode
    Input Text    //*[@id="ecZipCodeTxt"]    30043
#Cont Phone
    Input Text    //*[@id="ecPhone"]    770-000-0001
#Pref Email
    Input Text    //*[@id="ecEmailTxt"]    iLoveMama@gmail.com

#Mentor Fields
    Input Text   //*[@id="mentorNameTxt"]    Cengiz & Rahaf
#Mentor Cell
    Input Text    //*[@id="mentorCellTxt"]    770-000-0000
#Mentor Office
    Input Text    //*[@id="mentorOfficeTxt"]    H-1210
#Mentor Email
    Input Text    //*[@id="mentorEmailTxt"]    cgunnay@ggc.edu
#Approved Intern Committee Sites
    Select From List By Label    internsite    Covenant Health Pharmacy
#
    Select From List By Label    isstudentemployedatsite    No
#Edu comp
    Input Text    //*[@id="firstTxt"]    Testing
    Input Text    //*[@id="secondTxt"]    Testing
    Input Text    //*[@id="thirdTxt"]    Testing

    Input Text    //*[@id="signatureTxt"]    ${mockEmail}
    Input Text    //*[@id="printedTxt"]    ${mockEmail}

    Mouse Down    //*[@id="submitBtn"]
    Mouse Up    //*[@id="submitBtn"]
