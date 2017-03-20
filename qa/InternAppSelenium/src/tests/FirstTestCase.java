package tests;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
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
import pageObjects.DocumentsUploadPage;
import pageObjects.EditProfilePage;
import pageObjects.FAQPage;
import pageObjects.InitialPage;
import pageObjects.LoginPage;
import pageObjects.PromotePage;
import pageObjects.SiteNotesPage;
import pageObjects.ViewSitesPage;

public class FirstTestCase extends TestBase 
{
	private WebDriver driver;
	private InitialPage initial;
	private LoginPage loginPage;
	private DocumentsUploadPage documents;
	private PromotePage promote;
	private ApplicationsPage applications;
	private FAQPage faq;
	private EditProfilePage editProfilePage;
	private AddSitesPage addSites;
	private ViewSitesPage viewSites;
	private SiteNotesPage siteNotesPage;

	@Before
	public void Init() 
	{
		driver = createDriver();

		// Launch the Online Store Website
		driver.get("http://ggc-internapp.herokuapp.com/");

		initial = new InitialPage(driver);
		loginPage = new LoginPage(driver);
		documents = new DocumentsUploadPage(driver);
		promote = new PromotePage(driver);
		applications = new ApplicationsPage(driver);
		faq = new FAQPage(driver);
		editProfilePage = new EditProfilePage(driver);
		addSites = new AddSitesPage(driver);
		viewSites = new ViewSitesPage(driver);
		siteNotesPage = new SiteNotesPage(driver);
	}

	@SuppressWarnings("deprecation")
	@Test
	public void firstTest() {
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
	}

	@After
	public void TearDown() {
		driver.quit();
	}
}