package sopra.ux.gae.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Model class which will store the Event details
 * 
 * @author misaqui - Sopra Group - UX
 * 
 */

@Entity
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String host;
	private String title;
	private String description;
	private String url;
	private String dateStart; // Re-think type - Maybe a range of dates.
	private String dateEnd;
	private List<String> audience;
	private List<String> tags;	
    private List<String> address; // format [street, zip code, city, country, latitude, longitud] 
    
    boolean finished;
	
	public Event(String host, String title, String description, String url,
			String dateStart, String dateEnd, List<String> audience,
			List<String> tags, List<String> address) {
		super();
		this.host = host;
		this.title = title;
		this.description = description;
		this.url = url;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.audience = audience;
		this.tags = tags;
		this.address = address;
		finished = false;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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

	public boolean isFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}

	

}