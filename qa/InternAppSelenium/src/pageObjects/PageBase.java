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
	
	public WebElement Wait(WebElement element)
	{
		element = new WebDriverWait(driver, 5000).until(ExpectedConditions.elementToBeClickable(element));
		return element;
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
	
	public void Click(WebElement element)
	{
		element = Wait(element);
		element.click();
	}
	
	public void SendKeys(WebElement element, String input)
	{
		element = Wait(element);
		element.sendKeys(input);
	}
}
