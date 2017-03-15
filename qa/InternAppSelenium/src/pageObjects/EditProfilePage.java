package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class EditProfilePage extends PageBase
{
	private WebDriver driver;
	
	@FindBy(linkText = "Edit Profile")
	private WebElement editProfilePage;
	
	public EditProfilePage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	public EditProfilePage open()
	{
		String url = driver.getCurrentUrl();
		Click(editProfilePage);
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
