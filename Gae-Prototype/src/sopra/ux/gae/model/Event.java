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
	//private People host;
	private String host;
	private String title;
	private String description;
	private String url;
	private String dateStart; // Re-think type - Maybe a range of dates.
	private String dateEnd;
	private List<String> audience;
	private List<String> tags;	
	//private Place place;
    private String address;
	//private List<People> audience;
	//private List<Tag> tags;	
    
    boolean finished;

	/*public Event(String host, String summary, String description, String url,
			List<People> audience, List<Tag> tags, Place place) {
		this.host = host;
		this.description = description;
		this.url = url;
		finished = false;
	}*/
    

	
	public Event(String host, String title, String description, String url,
			String dateStart, String dateEnd, List<String> audience,
			List<String> tags, String address) {
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
	
	public void setHost(String host) {
		this.host = host;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getHost() {
		return host;
	}	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	/*public People getHost() {
		return host;
	}

	public void setHost(People host) {
		this.host = host;
	}*/

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

	/*public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}*/

	/*public List<People> getAudience() {
		return audience;
	}

	public void setAudience(List<People> audience) {
		this.audience = audience;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	} */
	
	

	public boolean isFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}