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

WebUI.openBrowser('')

WebUI.navigateToUrl('http://localhost:8000/')

WebUI.click(findTestObject('Object Repository/Page_GGC Internship Application/a_Login'))

WebUI.click(findTestObject('Object Repository/Page_Login/div_Email_col-lg-5'))

WebUI.setText(findTestObject('Object Repository/Page_Login/input_Email_email'), 'lle4@ggc.edu')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_Login/input_Password_password'), '8SQVv/p9jVScEs4/2CZsLw==')

WebUI.sendKeys(findTestObject('Object Repository/Page_Login/input_Password_password'), Keys.chord(Keys.ENTER))

WebUI.click(findTestObject('Object Repository/Page_GGC Internship Signup/a_Applications'))

WebUI.click(findTestObject('Object Repository/Page_GGC Internship Signup/a_View by Semester'))

WebUI.click(findTestObject('Object Repository/Page_Applications/span_Fall 2022_glyphicon glyphicon-search'))

WebUI.click(findTestObject('Object Repository/Page_Application Details/input_Logout_btn btn-success btn-lg'))

WebUI.click(findTestObject('Object Repository/Page_Applications/a_Sites'))

WebUI.click(findTestObject('Object Repository/Page_Applications/a_View Sites'))

WebUI.click(findTestObject('Object Repository/Page_Site List/span_undefined_glyphicon glyphicon-search'))

WebUI.click(findTestObject('Object Repository/Page_Site Details/input_Logout_btn btn-success btn-lg'))

WebUI.closeBrowser()

