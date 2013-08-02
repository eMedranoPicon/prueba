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
	private String host;
	private String description;
	private String dateStart; //timestamp
	private String dateEnd; //timestamp
	private List<String> audience; //separated by commas
	private List<String> tags; //separated by commas
	private List<String> address; //{street, zipcode, city,country, lat, long}
	
		
	public Event() {
		super();
	}
	

	public Event(String title, String host, String description,
			String dateStart, String dateEnd, List<String> audience, List<String> tags, List<String> address) {
		super();
		this.title = title;
		this.host = host;
		this.description = description;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.audience = audience;
		this.tags = tags;
		this.address = address;
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
	public List<String> getAudience() {
		return audience;
	}


	public void setAudience(List<String> audience) {
		this.audience = audience;
	}


	public List<String> getTags() {
		return tags;
	}


	public void setTags(List<String> tags) {
		this.tags = tags;
	}


	public List<String> getAddress() {
		return address;
	}


	public void setAddress(List<String> address) {
		this.address = address;
	}

	

	
}
