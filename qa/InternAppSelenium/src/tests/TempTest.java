package tests;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TempTest extends TestBase
{
	@Test
	public void Test() 
	{
		System.setProperty("webdriver.gecko.driver",
				"C:\\Users\\blake\\Downloads\\geckodriver-v0.14.0-win64\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		driver.manage().window().maximize();
		
		// objects and variables instantiation
		String appUrl = "https://accounts.google.com";

		// launch the firefox browser and open the application url
		driver.get(appUrl);

		// declare and initialize the variable to store the expected title of
		// the webpage.
		String expectedTitle = "Sign in - Google Accounts";

		// fetch the title of the web page and save it into a string variable
		String actualTitle = driver.getTitle();

		// compare the expected title of the page with the actual title of the
		// page and print the result
		if (expectedTitle.equals(actualTitle)) {
			System.out.println("Verification Successful - The correct title is displayed on the web page.");
		} else {
			System.out.println("Verification Failed - An incorrect title is displayed on the web page.");
		}

		// enter a valid username in the email textbox
		WebElement username = driver.findElement(By.id("Email"));
		username.clear();
		username.sendKeys("TestSelenium");

		// click the next button to move to the next page.
		WebElement nextButton = driver.findElement(By.id("next"));
		nextButton.click();

		// enter a valid password in the password textbox
		try 
		{
			Thread.sleep(3000);
		}
		catch (InterruptedException e) 
		{
		}
		
		WebElement password = driver.findElement(By.id("Passwd"));
		password = new WebDriverWait(driver, 5000).until(ExpectedConditions.elementToBeClickable(password));
		password.sendKeys("password123");

		// click on the Sign in button
		WebElement SignInButton = driver.findElement(By.id("signIn"));
		SignInButton.click();

		// close the web browser
		System.out.println("Test script executed successfully.");

		// terminate the program
		driver.quit();
	}
}
