package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ViewSitesPage extends PageBase
{
	private WebDriver driver;
	
	@FindBy(linkText = "Sites")
	private WebElement sites;
	
	@FindBy(linkText = "View Sites")
	private WebElement viewSites;
	
	public ViewSitesPage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	public ViewSitesPage open()
	{
		sites.click();
		viewSites.click();
		sleep(4000);
		return this;
	}
}
