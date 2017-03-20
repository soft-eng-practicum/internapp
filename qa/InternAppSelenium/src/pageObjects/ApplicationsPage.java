package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ApplicationsPage extends PageBase
{
	private WebDriver driver;
	
	@FindBy(linkText = "Applications")
	private WebElement applicationsPage;
	
	public ApplicationsPage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	public ApplicationsPage open()
	{
		String url = driver.getCurrentUrl();
		Click(applicationsPage);
		WaitForUrlChange(url);
		try 
		{
			Thread.sleep(4000);
		} 
		catch (InterruptedException e)
		{
		}
		return new ApplicationsPage(driver);
	}
}
