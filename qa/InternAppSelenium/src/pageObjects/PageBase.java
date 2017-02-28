package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageBase
{
	private WebDriver driver;
	
	public PageBase(WebDriver driver)
	{
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	@FindBy(linkText = "Logout")
	private WebElement logout;
	
	public WebElement Wait(WebElement element)
	{
		WebElement wait = new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(element));
		return wait;
	}
	
	public void Logout()
	{
		logout.click();
	}
	
	public void WaitForUrlChange(String url)
	{
		int i = 0;
		while(i < 30)
		{
			if(driver.getCurrentUrl() != url)
			{
				break;
			}
			else
			{
				try 
				{
					Thread.sleep(1000);
				} 
				catch (InterruptedException e)
				{
					e.printStackTrace();
				}
			}
		}
	}
	
	public String getTitle()
	{
		return driver.getTitle();
	}
	
	public void sleep(int time)
	{
		try 
		{
			Thread.sleep(time);
		} 
		catch (InterruptedException e)
		{
		}
	}
}
