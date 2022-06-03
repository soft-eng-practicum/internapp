package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage extends PageBase
{
	private WebDriver driver;
	
	public LoginPage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	@FindBy(id = "emailTxt")
	private WebElement emailTxt;
	
	@FindBy(id = "passwordTxt")
	private WebElement passwordTxt;
	
	@FindBy(id = "loginBtn")
	private WebElement loginBtn;
	
	public LoginPage enterEmail(String email)
	{
		SendKeys(emailTxt, email);
		return this;
	}
	
	public LoginPage enterPassword(String password)
	{
		SendKeys(passwordTxt, password);
		return this;
	}
	
	public void clickLogin()
	{
		Click(loginBtn);
	}
	
	public void loginApplication(String email, String password)
	{
		enterEmail(email);
		enterPassword(password);
		clickLogin();
	}
}
