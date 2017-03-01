package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class DocumentationsPage extends PageBase
{
	private WebDriver driver;
	
	@FindBy(linkText = "Documentations")
	private WebElement documentationsPage;
	
	public DocumentationsPage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	public DocumentationsPage open()
	{
		String url = driver.getCurrentUrl();
		documentationsPage.click();
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
