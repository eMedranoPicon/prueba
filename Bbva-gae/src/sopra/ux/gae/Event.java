package sopra.ux.gae;

import java.util.ArrayList;
import java.util.Date;
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
	private Date dateStart;
	private Date dateEnd;
	private List audience = new ArrayList();
	private List tags = new ArrayList();
	private List address = new ArrayList();
	
		
	public Event() {
		super();
	}
	

	public Event(String title, String host, String description,
			Date dateStart, Date dateEnd, List audience, List tags, List address) {
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

	public Date getDateStart() {
		return dateStart;
	}

	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}

	public Date getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}
	public List getAudience() {
		return audience;
	}


	public void setAudience(List audience) {
		this.audience = audience;
	}


	public List getTags() {
		return tags;
	}


	public void setTags(List tags) {
		this.tags = tags;
	}


	public List getAddress() {
		return address;
	}


	public void setAddress(List address) {
		this.address = address;
	}

	

	
}
