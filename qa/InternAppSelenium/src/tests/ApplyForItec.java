package tests;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.openqa.selenium.WebDriver;

import pageObjects.AddSitesPage;
import pageObjects.ApplicationsPage;
import pageObjects.DocumentsUploadPage;
import pageObjects.EditProfilePage;
import pageObjects.FAQPage;
import pageObjects.InitialPage;
import pageObjects.ItecApplication;
import pageObjects.LoginPage;
import pageObjects.PromotePage;
import pageObjects.SiteNotesPage;
import pageObjects.ViewSitesPage;

public class ApplyForItec extends TestBase
{
	private WebDriver driver;
	private InitialPage initial;
	private LoginPage loginPage;
	private ApplicationsPage application;
	private ItecApplication app;
	
	@Before
	public void Init() 
	{
		driver = createDriver();

		initial = new InitialPage(driver);
		loginPage = new LoginPage(driver);
		application = new ApplicationsPage(driver);
		app = new ItecApplication(driver);
	}
	
	@Category(ApplyForItec.class)
	@Test
	public void createITECApp()
	{
		initial.clickLogin();
		loginPage.loginApplication("bnorman2@ggc.edu", "abc123");
		int num = application.getApplicationNumber();
		application.clickApply();
		app
			.setDesiredSemester("Fall", "2017")
			.setGraduation("Fall", "2017")
			.setMajor("Software Development")
			.setGPA("4.0")
			.setItecGPA("4.0")
			.set2150("Spring", "2016")
			.set3100("Spring", "2016")
			.set3200("Spring", "2016")
			.set3900("Spring", "2016")
			.setECName("Someone")
			.setECAddress("Somewhere")
			.setECCity("City")
			.setECState("GA")
			.setECZip("30078")
			.setECPhone("1234567890")
			.setECEmail("email@gmail.com")
			.setMentorName("Rick Price")
			.setMentorPhone("1234567890")
			.setMentorOffice("A100")
			.setMentorEmail("email@gmail.com")
			.setInterests("Interests")
			.setType("Type")
			.setDevList("Yes")
			.setIsEmployed("No")
			.setSignature("Me")
			.setPrinted("Me")
			.clickSubmit();
		int num2 = application.open()
					.getApplicationNumber();
		
		Assert.assertEquals(++num, num2);
	}
	
	@After
	public void TearDown()
	{
		driver.quit();
	}
}
