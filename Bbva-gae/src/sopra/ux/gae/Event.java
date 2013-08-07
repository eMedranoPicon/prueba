package sopra.ux.gae;

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
	private String urlImg;
	private String host;
	private String urlEvent;
	private String description;
	private String dateStart; 
	private String dateEnd;
	private String audience; //separated by commas
	private String tags; //separated by commas
	
	private List<String> address; //{street, zipcode, city,country, lat, long}	
	
	public Event(String title, String urlImg, String host, String urlEvent,
			String description, String dateStart, String dateEnd,
			String audience, String tags, List<String> address) {
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

	

	
}
