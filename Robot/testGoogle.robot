*** Settings ***
Documentation    Test that is verifying the opening of Google.com Checks if the installation is correct. 

Library    SeleniumLibrary

*** Test Cases ***
Login Test
    Open Browser    https://google.com    chrome
