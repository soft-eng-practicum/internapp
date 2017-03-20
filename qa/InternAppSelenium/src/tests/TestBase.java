package tests;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.Result;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import junit.framework.Assert;
import junit.framework.TestResult;
import pageObjects.AddSitesPage;
import pageObjects.ApplicationsPage;
import pageObjects.EditProfilePage;
import pageObjects.FAQPage;
import pageObjects.InitialPage;
import pageObjects.LoginPage;
import pageObjects.PromotePage;
import pageObjects.ViewSitesPage;

public class TestBase 
{
	public WebDriver createDriver()
	{
		System.setProperty("webdriver.gecko.driver",
				"C:\\Users\\blake\\Downloads\\geckodriver-v0.14.0-win64\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		driver.manage().window().maximize();
		
		return driver;
	}
}