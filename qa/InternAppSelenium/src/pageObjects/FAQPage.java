package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class FAQPage extends PageBase
{
	private WebDriver driver;
	
	@FindBy(linkText = "FAQ")
	private WebElement faqPage;
	
	public FAQPage(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	public FAQPage open()
	{
		String url = driver.getCurrentUrl();
		faqPage.click();
		WaitForUrlChange(url);
		sleep(4000);
		return this;
	}
}
