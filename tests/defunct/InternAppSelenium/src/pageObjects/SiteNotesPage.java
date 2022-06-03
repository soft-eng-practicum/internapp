package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class SiteNotesPage extends PageBase
{
	private WebDriver driver;
	
	@FindBy(linkText = "/sitenotes")
	private WebElement documentationsPage;
	
	public SiteNotesPage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	public SiteNotesPage open()
	{
		String url = driver.getCurrentUrl();
		Click(documentationsPage);
		WaitForUrlChange(url);
		try 
		{
			Thread.sleep(4000);
		} 
		catch (InterruptedException e)
		{
		}
		return this;
	}
}
