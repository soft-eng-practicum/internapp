package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ItecApplication extends PageBase
{
	private WebDriver driver;
	
	public ItecApplication(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	@FindBy(id = "semesterList")
	private WebElement desiredSemester;
	
	@FindBy(id = "yearList")
	private WebElement desiredYear;
	
	@FindBy(name = "expectedGraduationSemester")
	private WebElement gradSemester;
	
	@FindBy(name = "expectedGraduationYear")
	private WebElement gradYear;
	
	@FindBy(id = "major")
	private WebElement major;
	
	@FindBy(id = "gpaTxt")
	private WebElement gpa;
	
	@FindBy(id = "itecGPATxt")
	private WebElement itecGPA;
	
	@FindBy(id = "2150Sem")
	private WebElement sem2150;
	
	@FindBy(id = "2150Year")
	private WebElement year2150;
	
	@FindBy(id = "3100Sem")
	private WebElement sem3100;
	
	@FindBy(id = "3100Year")
	private WebElement year3100;
	
	@FindBy(id = "3200Sem")
	private WebElement sem3200;
	
	@FindBy(id = "3200Year")
	private WebElement year3200;
	
	@FindBy(id = "3900Sem")
	private WebElement sem3900;
	
	@FindBy(id = "3900Year")
	private WebElement year3900;
	
	@FindBy(id = "ecNameTxt")
	private WebElement ecName;
	
	@FindBy(id = "ecAddressTxt")
	private WebElement ecAddress;
	
	@FindBy(id = "ecCityTxt")
	private WebElement ecCity;
	
	@FindBy(id = "ecState")
	private WebElement ecState;
	
	@FindBy(id = "ecZipCodeTxt")
	private WebElement ecZip;
	
	@FindBy(id = "ecPhoneTxt")
	private WebElement ecPhone;
	
	@FindBy(id = "ecEmailTxt")
	private WebElement ecEmail;
	
	@FindBy(id = "mentorNameTxt")
	private WebElement mentorName;
	
	@FindBy(id = "mentorPhoneTxt")
	private WebElement mentorPhone;
	
	@FindBy(id = "mentorOfficeTxt")
	private WebElement mentorOffice;
	
	@FindBy(id = "mentorEmailTxt")
	private WebElement mentorEmail;
	
	@FindBy(id = "textArea")
	private WebElement interests;
	
	@FindBy(id = "interestTxt")
	private WebElement type;
	
	@FindBy(id = "softwareDevList")
	private WebElement devList;
	
	@FindBy(id = "isEmployedList")
	private WebElement isEmployed;
	
	@FindBy(id = "signatureTxt")
	private WebElement signature;
	
	@FindBy(id = "printedTxt")
	private WebElement printed;
	
	@FindBy(id = "submitBtn")
	private WebElement submitBtn;
	
	public ItecApplication setDesiredSemester(String semester, String year)
	{
		SendKeys(desiredSemester, semester);
		SendKeys(desiredYear, year);
		return this;
	}
	
	public ItecApplication setGraduation(String semester, String year)
	{
		SendKeys(gradSemester, semester);
		SendKeys(gradYear, year);		
		return this;
	}
	
	public ItecApplication setMajor(String text)
	{
		SendKeys(major, text);
		return this;
	}
	
	public ItecApplication setGPA(String text)
	{
		SendKeys(gpa, text);
		return this;
	}
	
	public ItecApplication setItecGPA(String text)
	{
		SendKeys(itecGPA, text);
		return this;
	}
	
	public ItecApplication set2150(String semester, String year)
	{
		SendKeys(sem2150, semester);
		SendKeys(year2150, year);		
		return this;
	}
	
	public ItecApplication set3100(String semester, String year)
	{
		SendKeys(sem3100, semester);
		SendKeys(year3100, year);		
		return this;
	}
	
	public ItecApplication set3200(String semester, String year)
	{
		SendKeys(sem3200, semester);
		SendKeys(year3200, year);		
		return this;
	}
	
	public ItecApplication set3900(String semester, String year)
	{
		SendKeys(sem3900, semester);
		SendKeys(year3900, year);		
		return this;
	}
	
	public ItecApplication setECName(String text)
	{
		SendKeys(ecName, text);
		return this;
	}
	
	public ItecApplication setECAddress(String text)
	{
		SendKeys(ecAddress, text);
		return this;
	}
	
	public ItecApplication setECCity(String text)
	{
		SendKeys(ecCity, text);
		return this;
	}
	
	public ItecApplication setECState(String text)
	{
		SendKeys(ecState, text);
		return this;
	}
	
	public ItecApplication setECZip(String text)
	{
		SendKeys(ecZip, text);
		return this;
	}
	
	public ItecApplication setECPhone(String text)
	{
		SendKeys(ecPhone, text);
		return this;
	}
	
	public ItecApplication setECEmail(String text)
	{
		SendKeys(ecEmail, text);
		return this;
	}
	
	public ItecApplication setMentorName(String text)
	{
		SendKeys(mentorName, text);
		return this;
	}
	
	public ItecApplication setMentorPhone(String text)
	{
		SendKeys(mentorPhone, text);
		return this;
	}
	
	public ItecApplication setMentorOffice(String text)
	{
		SendKeys(mentorOffice, text);
		return this;
	}
	
	public ItecApplication setMentorEmail(String text)
	{
		SendKeys(mentorEmail, text);
		return this;
	}
	
	public ItecApplication setInterests(String text)
	{
		SendKeys(interests, text);
		return this;
	}
	
	public ItecApplication setType(String text)
	{
		SendKeys(type, text);
		return this;
	}
	
	public ItecApplication setDevList(String text)
	{
		SendKeys(devList, text);
		return this;
	}
	
	public ItecApplication setIsEmployed(String text)
	{
		SendKeys(isEmployed, text);
		return this;
	}
	
	public ItecApplication setSignature(String text)
	{
		SendKeys(signature, text);
		return this;
	}
	
	public ItecApplication setPrinted(String text)
	{
		SendKeys(printed, text);
		return this;
	}
	
	public ItecApplication clickSubmit()
	{
		Click(submitBtn);
		return this;
	}
}
