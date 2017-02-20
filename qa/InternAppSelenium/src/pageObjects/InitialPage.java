package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

public class InitialPage extends PageBase
{
	private WebDriver driver;
	
	public InitialPage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	@FindBy(how = How.XPATH, using = "/html/body/div/div/a[1]")
	private WebElement loginBtn;
	
	public void clickLogin()
	{
		loginBtn.click();
	}
}
