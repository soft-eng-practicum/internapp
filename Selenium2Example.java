package AutomationFinal;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.WebElement;

public class Selenium2Example  {
	public static void main(String[] args) {

		System.setProperty("webdriver.chrome.driver", "C:\\Users\\vdarji.ROUTEMATCH\\Desktop\\chrome\\chromedriver.exe");
		// Create a new instance of the Chrome driver.
		WebDriver driver = new ChromeDriver();

		//driver.get("http://www.google.com");
		driver.get("https://ggc-internapp.herokuapp.com/login");
		// Find the email text input element by its name
		WebElement email = driver.findElement(By.name("email"));
		email.sendKeys("vdarji@ggc.edu");
		//Find the password text input element by its name
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} // or you can use thread.sleep and wait.until(ExpectedConditions.elementToBeClickable(locator)); both
		WebElement password = driver.findElement(By.name("password"));
		password.sendKeys("1");
		//Find the login button and clickk it
		WebElement Login = driver.findElement(By.xpath("/html/body/div/div/form/button"));
		Login.click();
		//find and click Bio/itec links
		driver.findElement(By.cssSelector("a[href*='bio']")).click();
		//feel out the form
		driver.findElement(By.xpath("/html/body/div/form/div[2]/label/input")).sendKeys("Joe Burst");
		driver.findElement(By.xpath("/html/body/div/form/div[3]/input")).sendKeys("1 Lawrenceville St");
		driver.findElement(By.xpath("/html/body/div/form/div[4]/input")).sendKeys("vdarji@ggc.edu");
		driver.findElement(By.xpath("/html/body/div/form/div[5]/input")).sendKeys("Lawrenceville");
		driver.findElement(By.xpath("/html/body/div/form/div[6]/label/input")).sendKeys("30043");
		driver.findElement(By.xpath("/html/body/div/form/div[7]/input")).sendKeys("1234567890");
		driver.findElement(By.xpath("/html/body/div/form/div[8]/input")).sendKeys("Dr. Rick Price");
		driver.findElement(By.xpath("/html/body/div/form/div[9]/input")).sendKeys("9874561230");
		driver.findElement(By.xpath("/html/body/div/form/div[10]/input")).sendKeys("rprice@ggc.edu");
		driver.findElement(By.xpath("/html/body/div/form/div[11]/input")).sendKeys("C-1321");
		driver.findElement(By.xpath("/html/body/div/form/div[12]/input")).sendKeys("125");
		driver.findElement(By.xpath("/html/body/div/form/div[13]/input")).sendKeys("General biology");
		driver.findElement(By.xpath("/html/body/div/form/div[14]/input")).sendKeys("3.25");
		driver.findElement(By.xpath("/html/body/div/form/div[15]/input")).sendKeys("3.95");
		driver.findElement(By.xpath("/html/body/div/form/div[16]/input")).sendKeys("Teacher");
		driver.findElement(By.xpath("/html/body/div/form/div[18]/input")).sendKeys("2016");
		driver.findElement(By.xpath("/html/body/div/form/div[20]/label/input")).sendKeys("CDC");
		driver.findElement(By.xpath("/html/body/div/form/div[21]/input")).sendKeys("R&D");
		driver.findElement(By.xpath("/html/body/div/form/div[22]/input")).sendKeys("1600 Clifton Road Atlanta");
		driver.findElement(By.xpath("/html/body/div/form/div[23]/input")).sendKeys("Atlanta");
		driver.findElement(By.xpath("/html/body/div/form/div[24]/input")).sendKeys("GA");
		driver.findElement(By.xpath("/html/body/div/form/div[25]/input")).sendKeys("30329");
		driver.findElement(By.xpath("/html/body/div/form/div[26]/input")).sendKeys("Jon Cox");
		driver.findElement(By.xpath("/html/body/div/form/div[27]/input")).sendKeys("HR@cdc.gov");
		driver.findElement(By.xpath("/html/body/div/form/div[28]/input")).sendKeys("VP of Operations");
		driver.findElement(By.xpath("/html/body/div/form/div[29]/input")).sendKeys("HR@cdc.gov");
		driver.findElement(By.xpath("/html/body/div/form/div[30]/input")).sendKeys("DR. LATANYA P. HAMMONDS-ODIE");
		driver.findElement(By.xpath("/html/body/div/form/div[31]/input")).sendKeys("lhammond@ggc.edu");
		driver.findElement(By.xpath("/html/body/div/form/div[34]/label/input")).sendKeys("Research Specialist");
		driver.findElement(By.xpath("/html/body/div/form/div[36]/input")).sendKeys("20");
		driver.findElement(By.xpath("/html/body/div/form/div[38]/input")).sendKeys("Effectively use problem solving techniques");
		driver.findElement(By.xpath("/html/body/div/form/div[39]/input")).sendKeys("Be able to analyze data");
		driver.findElement(By.xpath("/html/body/div/form/div[40]/input")).sendKeys("Improve Communication");
		driver.findElement(By.xpath("/html/body/div/form/div[41]/label/input")).sendKeys("JBurst");
		driver.findElement(By.xpath("/html/body/div/form/div[42]/input")).sendKeys("Joe Burst");
		//Click the submit button
		//WebElement Submit = driver.findElement(By.xpath("/html/body/div/form/button"));
		//Submit.click();
		
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		//Close the browser
		driver.quit();
	}
}