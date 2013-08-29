package sopra.ux.gae;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class Event {
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long id;
	private String title;
	private String urlImg = "/img/events/events3.jpg";
	private String host;
	private String urlEvent;
	private String description;
	private String dateStart; 
	private String dateEnd;
	private String audience; //separated by commas
	private String tags; //separated by commas
	private List<String> tagsArray;
	private boolean eventPast;
	private List<String> datesArray; //[dd,mm,yyyy,dateStart,dd,mm,dateEnd]
	
	private List<String> address; //{street, zipcode, city,country, lat, long}	
			
	

	public Event(String title, String urlImg, String host, String urlEvent,
			String description, String dateStart, String dateEnd,
			String audience, String tags, List<String> tagsArray,
			boolean eventPast, List<String> datesArray, List<String> address) {
		super();
		this.title = title;
		this.urlImg = urlImg;
		this.host = host;
		this.urlEvent = urlEvent;
		this.description = description;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.audience = audience;
		this.tags = tags;
		this.tagsArray = tagsArray;
		this.eventPast = eventPast;
		this.datesArray = datesArray;
		this.address = address;
	}


	public Event() {
		super();
	}



	public String getUrlImg() {
		return urlImg;
	}



	public void setUrlImg(String urlImg) {
		this.urlImg = urlImg;
	}



	public String getUrlEvent() {
		return urlEvent;
	}



	public void setUrlEvent(String urlEvent) {
		this.urlEvent = urlEvent;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDateStart() {
		return dateStart;
	}

	public void setDateStart(String dateStart) {
		this.dateStart = dateStart;
	}

	public String getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(String dateEnd) {
		this.dateEnd = dateEnd;
	}
	public String getAudience() {
		return audience;
	}


	public void setAudience(String audience) {
		this.audience = audience;
	}


	public String getTags() {
		return tags;
	}


	public void setTags(String tags) {
		this.tags = tags;
	}


	public List<String> getAddress() {
		return address;
	}


	public void setAddress(List<String> address) {
		this.address = address;
	}


	public boolean isEventPast() {
		
		// This is how to get today's date in Java
        Date today = new Date();
        Date dateStartJ = null;
		try {
			dateStartJ = new SimpleDateFormat("dd/MM/yyyy HH:mm").parse(this.dateStart);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        System.out.println(dateStartJ); 
        
        if(today.after(dateStartJ)){
        	eventPast = true;
        } else {
        	eventPast = false;
        }
        System.out.println(eventPast); 
        
		return eventPast;
	}


	public void setEventPast(boolean eventPast) {
		this.eventPast = eventPast;
	}

	public List<String> getDatesArray() {
		return datesArray;
	}

	public void setDatesArray() {		
		List<String> datesEvent = new ArrayList<String>();		
		Date dateS = null;
		Date dateE = null;
		Calendar calS = new GregorianCalendar();
		Calendar calE = new GregorianCalendar();
		try {
			dateS = new SimpleDateFormat("dd/MM/yyyy HH:mm").parse(this.dateStart);
			dateE = new SimpleDateFormat("dd/MM/yyyy HH:mm").parse(this.dateEnd);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
                
        calS.setTime(dateS);
        datesEvent.add(this.dateStart);
        int dayS = calS.get(Calendar.DAY_OF_MONTH);
        datesEvent.add(String.valueOf(dayS));
        int monthS = calS.get(Calendar.MONTH);
        datesEvent.add(String.valueOf(monthS+1));
        int yearS = calS.get(Calendar.YEAR);
        datesEvent.add(String.valueOf(yearS));        
		
        calE.setTime(dateE);
        datesEvent.add(this.dateEnd);
        int dayE = calE.get(Calendar.DAY_OF_MONTH);
        datesEvent.add(String.valueOf(dayE));
        int monthE = calE.get(Calendar.MONTH);
        datesEvent.add(String.valueOf(monthE+1));
        int yearE = calS.get(Calendar.YEAR);
        datesEvent.add(String.valueOf(yearE)); 
        
		this.datesArray = datesEvent;
	}

	public List<String> getTagsArray() {
		return tagsArray;
	}

	public void setTagsArray() {
		this.tagsArray = new ArrayList<String>();	
		if(this.tags != null) {
		List<String> lista = new ArrayList<String>(Arrays.asList(this.tags.split(",")));
		this.tagsArray = lista;
		} else {
			this.tagsArray.add("No hay tags registradas");
		} 		
	}	
	

	

	
}
