package PageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class BioApplication extends PageBase
{
	private WebDriver driver;
	
	public BioApplication(WebDriver driver)
	{
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	
	@FindBy(id = "semesterList")
	private WebElement desiredSemester;
	
	@FindBy(id = "yearTxt")
	private WebElement desiredYear;
	
	@FindBy(id = "majorTxt")
	private WebElement major;
	
	@FindBy(id = "graduationSemester")
	private WebElement gardSemester;
	
	@FindBy(id = "graduationYear")
	private WebElement gradYear;
	
	@FindBy(id = "gpaTxt")
	private WebElement gpa;
	
	@FindBy(id = "programGPATxt")
	private WebElement bioGPA;
	
	@FindBy(id = "hoursTxt")
	private WebElement hours;
	
	@FindBy(id = "professionTxt")
	private WebElement career;
	
	@FindBy(id = "ecNameTxt")
	private WebElement guardianName;
	
	@FindBy(id = "ecAddressTxt")
	private WebElement address;
	
	@FindBy(id = "ecCityTxt")
	private WebElement city;
	
	@FindBy(id = "ecStateTxt")
	private WebElement state;
	
	@FindBy(id = "ecZipCodeTxt")
	private WebElement zip;
	
	@FindBy(id = "ecPhone")
	private WebElement phone;
	
	@FindBy(id = "ecEmailTxt")
	private WebElement guardianEmail;
	
	@FindBy(id = "mentorNameTxt")
	private WebElement mentorName;
	
	@FindBy(id = "mentorCellTxt")
	private WebElement mentorCell;
	
	@FindBy(id = "mentorOfficeTxt")
	private WebElement mentorOffice;
	
	@FindBy(id = "mentorEmailTxt")
	private WebElement mentorEmail;
	
	@FindBy(id = "previouslyApplied")
	private WebElement applied;
	
	@FindBy(id = "additionalInfoList")
	private WebElement addInfo;
	
	@FindBy(id = "siteNameTxt")
	private WebElement siteName;
	
	@FindBy(id = "specialty")
	private WebElement specialty;
	
	@FindBy(id = "psAddressTxt")
	private WebElement siteAddress;
	
	@FindBy(id = "psCityTxt")
	private WebElement siteCity;
	
	@FindBy(id = "psStateTxt")
	private WebElement siteState;
	
	@FindBy(id = "psZipCodeTxt")
	private WebElement siteZip;
	
	@FindBy(id = "psPhoneNumber")
	private WebElement sitePhone;
	
	@FindBy(id = "psManagerTxt")
	private WebElement manager;
	
	@FindBy(id = "psManagerEmail")
	private WebElement managerEmail;
	
	@FindBy(id = "psManagerTitleTxt")
	private WebElement managerTitle;
	
	@FindBy(id = "preceptorNameTxt")
	private WebElement preceptorName;
	
	@FindBy(id = "preceptorPhoneTxt")
	private WebElement preceptorPhone;
	
	@FindBy(id = "preceptorEmailTxt")
	private WebElement preceptorEmail;
	
	@FindBy(id = "prceptorManagerList")
	private WebElement prceptorManager;
	
	@FindBy(id = "preceptorPositionTxt")
	private WebElement preceptorPosition;
	
	@FindBy(id = "isStudentEmployedList")
	private WebElement employedStatus;
	
	@FindBy(id = "currentPosititionTxt")
	private WebElement currentPositition;
	
	@FindBy(id = "isPaidList")
	private WebElement isPaid;
	
	@FindBy(id = "averageHoursTxt")
	private WebElement averageHours;
	
	@FindBy(id = "internquestion")
	private WebElement internquestion;
	
	@FindBy(id = "studentRelationshipList")
	private WebElement studentRelationship;
	
	@FindBy(id = "firstTxt")
	private WebElement first;
	
	@FindBy(id = "secondTxt")
	private WebElement second;
	
	@FindBy(id = "thirdTxt")
	private WebElement third;	
	
	@FindBy(id = "signatureTxt")
	private WebElement signature;
	
	@FindBy(id = "printedNameTxt")
	private WebElement printedName;

	@FindBy(id = "submitBtn")
	private WebElement submitBtn;
	
	

	public BioApplication setDesiredSemester(String semester, String year)
	{
		SendKeys(desiredSemester, semester);
		SendKeys(desiredYear, year);
		return this;
	}
	
	public BioApplication setMajor(String bio)
	{
		SendKeys(major, bio);
		return this;
	}

	public BioApplication setGraduation(String semester, String year)
	{
		SendKeys(gardSemester, semester);
		SendKeys(gradYear, year);		
		return this;
	}
	
	public BioApplication setGPA(String text)
	{
		SendKeys(gpa, text);
		return this;
	}
	
	public BioApplication setBioGPA(String text)
	{
		SendKeys(bioGPA, text);
		return this;
	}
	
	public BioApplication setHoursComp(String text)
	{
		SendKeys(hours, text);		
		return this;
	}
	
	public BioApplication setProfession(String text)
	{
		SendKeys(career, text);		
		return this;
	}
	
	public BioApplication setGuardName(String text)
	{
		SendKeys(guardianName, text);		
		return this;
	}
	
	public BioApplication setGuardAddress(String text)
	{
		SendKeys(address, text);		
		return this;
	}
	
	public BioApplication setGuardCity(String text)
	{
		SendKeys(city, text);
		return this;
	}
	
	public BioApplication setGuardState(String text)
	{
		SendKeys(state, text);
		return this;
	}
	
	public BioApplication setGuardZip(String text)
	{
		SendKeys(zip, text);
		return this;
	}
	
	public BioApplication setGuardPhone(String text)
	{
		SendKeys(phone, text);
		return this;
	}
	
	public BioApplication setGuardEmail(String text)
	{
		SendKeys(guardianEmail, text);
		return this;
	}
	
	public BioApplication setMentorName(String text)
	{
		SendKeys(mentorName, text);
		return this;
	}
	
	public BioApplication setMentorCell(String text)
	{
		SendKeys(mentorCell, text);
		return this;
	}
	
	public BioApplication setMentorOffice(String text)
	{
		SendKeys(mentorOffice, text);
		return this;
	}
	
	public BioApplication setMentorEmail(String text)
	{
		SendKeys(mentorEmail, text);
		return this;
	}
	
	public BioApplication setPreviouslyApplied(String yes)
	{
		SendKeys(applied, yes);
		return this;
	}
	
	public BioApplication setInfoList(String other)
	{
		SendKeys(addInfo, other);
		return this;
	}
	
	public BioApplication setSiteName(String text)
	{
		SendKeys(siteName, text);
		return this;
	}
	
	public BioApplication setSpecialty(String text)
	{
		SendKeys(specialty, text);
		return this;
	}
	
	public BioApplication setSiteAddress(String text)
	{
		SendKeys(siteAddress, text);
		return this;
	}
	
	public BioApplication setSiteCity(String text)
	{
		SendKeys(siteCity, text);
		return this;
	}
	
	public BioApplication setSiteState(String text)
	{
		SendKeys(siteState, text);
		return this;
	}
		
	public BioApplication setSiteZip(String text)
	{
		SendKeys(siteZip, text);
		return this;
	}
		
	public BioApplication setSitePhone(String text)
	{
		SendKeys(sitePhone, text);
		return this;
	}
		
	public BioApplication setPSManager(String text)
	{
		SendKeys(manager, text);
		return this;
	}
		
	public BioApplication setManagerEmail(String text)
	{
		SendKeys(managerEmail, text);
		return this;
	}
		
	public BioApplication setManagerTitle(String text)
	{
		SendKeys(managerTitle, text);
		return this;
	}
		
	public BioApplication setPreceptorName(String text)
	{
		SendKeys(preceptorName, text);
		return this;
	}
		
	public BioApplication setPreceptorPhone(String text)
	{
		SendKeys(preceptorPhone, text);
		return this;
	}
		
	public BioApplication setPreceptorEmail(String text)
	{
		SendKeys(preceptorEmail, text);
		return this;
	}

	public BioApplication setPrceptorManager(String yes)
	{
		SendKeys(prceptorManager, yes);
		return this;
	}
		
	public BioApplication setPreceptorPosition(String text)
	{
		SendKeys(preceptorPosition, text);
		return this;
	}
		
	public BioApplication setIsEmployed(String yes)
	{
		SendKeys(employedStatus, yes);
		return this;
	}
		
	public BioApplication setCurrentPositition(String text)
	{
		SendKeys(currentPositition, text);
		return this;
	}
		
	public BioApplication setIsPaid(String yes)
	{
		SendKeys(isPaid, yes);
		return this;
	}
		
	public BioApplication setAverageHours(String text)
	{
		SendKeys(averageHours, text);
		return this;
	}
		
	public BioApplication setInternquestion(String yes)
	{
		SendKeys(internquestion, yes);
		return this;
	}
		
	public BioApplication setStudentRelationship(String yes)
	{
		SendKeys(studentRelationship, yes);
		return this;
	}
		
	public BioApplication setFirst(String text)
	{
		SendKeys(first, text);
		return this;
	}
			
	public BioApplication setSecond(String text)
	{
		SendKeys(second, text);
		return this;
	}
			
	public BioApplication setThird(String text)
	{
		SendKeys(third, text);
		return this;
	}
			
	public BioApplication setSignature(String text)
	{
		SendKeys(signature, text);
		return this;
	}
			
	public BioApplication setPrintedName(String text)
	{
		SendKeys(printedName, text);
		return this;
	}
	
	public BioApplication clickSubmit()
	{
		Click(submitBtn);
		return this;
	}

}
