package tests;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.Result;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import junit.framework.Assert;
import junit.framework.TestResult;
import pageObjects.AddSitesPage;
import pageObjects.ApplicationsPage;
import pageObjects.DocumentationsPage;
import pageObjects.EditProfilePage;
import pageObjects.FAQPage;
import pageObjects.InitialPage;
import pageObjects.LoginPage;
import pageObjects.PromotePage;
import pageObjects.ViewSitesPage;

public class FirstTestCase extends TestBase
{
	@Test
	public void firstTest() 
	{
		WebDriver driver = createDriver();

		// Launch the Online Store Website
		driver.get("http://ggc-internapp.herokuapp.com/");
		// driver.get("http://ggc-internapp.herokuapp.com/login");

		InitialPage initial = new InitialPage(driver);
		LoginPage loginPage = new LoginPage(driver);
		DocumentationsPage documents = new DocumentationsPage(driver);
		PromotePage promote = new PromotePage(driver);
		ApplicationsPage applications = new ApplicationsPage(driver);
		FAQPage faq = new FAQPage(driver);
		EditProfilePage editProfilePage = new EditProfilePage(driver);
		AddSitesPage addSites = new AddSitesPage(driver);
		ViewSitesPage viewSites = new ViewSitesPage(driver);

		initial.clickLogin();
		
		loginPage.loginApplication("admin@ggc.edu", "admin");
		
		documents.open();		
		String title = documents.getTitle();
		Assert.assertEquals(title, "Applications");
		
		applications.open();		
		title = applications.getTitle();
		Assert.assertEquals(title, "Applications");
		
		promote.open();		
		title = promote.getTitle();
		Assert.assertEquals(title, "GGC Internship Signup");
		
		faq.open();		
		title = faq.getTitle();
		Assert.assertEquals(title, "FAQ");
		
		addSites.open();
		title = addSites.getTitle();
		Assert.assertEquals(title, "Add Site");
		
		viewSites.open();
		title = viewSites.getTitle();
		Assert.assertEquals(title, "Site");
		
		editProfilePage.open();		
		title = editProfilePage.getTitle();
		Assert.assertEquals(title, "GGC Internship Edit Profile");
		
		editProfilePage.Logout();

		// Close the driver
		driver.quit();
		Assert.assertTrue(true);
	}
}