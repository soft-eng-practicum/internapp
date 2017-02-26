package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class PromotePage extends PageBase
{
	private WebDriver driver;
	
	@FindBy(linkText = "Promote")
	private WebElement promotePage;
	
	public PromotePage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	public PromotePage open()
	{
		String url = driver.getCurrentUrl();
		promotePage = Wait(promotePage);
		promotePage.click();
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
