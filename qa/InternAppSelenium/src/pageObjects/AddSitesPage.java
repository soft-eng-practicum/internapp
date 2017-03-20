package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class AddSitesPage extends PageBase
{
	private WebDriver driver;
	
	@FindBy(linkText = "Companies")
	private WebElement sites;
	
	@FindBy(linkText = "Add Sites")
	private WebElement addSites;
	
	public AddSitesPage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	public AddSitesPage open()
	{
		Click(sites);
		Click(addSites);
		sleep(4000);
		return this;
	}
}
