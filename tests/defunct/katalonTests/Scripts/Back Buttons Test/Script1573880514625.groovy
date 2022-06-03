import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.callTestCase(findTestCase('Login Test Case'), [:], FailureHandling.STOP_ON_FAILURE)

WebUI.navigateToUrl('http://localhost:8000/home')

WebUI.click(findTestObject('Page_GGC Internship Signup/a_Applications'))

WebUI.click(findTestObject('Page_GGC Internship Signup/a_View by Semester'))

WebUI.click(findTestObject('Page_Applications/span_Fall 2022_glyphicon glyphicon-search'))

WebUI.click(findTestObject('Page_Application Details/input_Logout_btn btn-success btn-lg'))

WebUI.click(findTestObject('Page_Applications/a_Sites'))

WebUI.click(findTestObject('Page_Applications/a_View Sites'))

WebUI.click(findTestObject('Page_Site List/span_undefined_glyphicon glyphicon-search'))

WebUI.click(findTestObject('Page_Site Details/input_Logout_btn btn-success btn-lg'))

