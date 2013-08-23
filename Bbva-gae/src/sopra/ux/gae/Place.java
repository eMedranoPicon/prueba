package sopra.ux.gae;

import java.util.List;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class Place {
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long id;
	private String namePlace;
	private String typePlace;
	private List<String> address;
	private String description;
	private List<String> contact; // {Nombre Completo - Email}
	private String creator;
	
	
	public Place() {
		super();
	}


	public Place(String namePlace, String typePlace, List<String> address,
			String description, List<String> contact, String creator) {
		super();
		this.namePlace = namePlace;
		this.typePlace = typePlace;
		this.address = address;
		this.description = description;
		this.contact = contact;
		this.creator = creator;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getNamePlace() {
		return namePlace;
	}


	public void setNamePlace(String namePlace) {
		this.namePlace = namePlace;
	}


	public String getTypePlace() {
		return typePlace;
	}


	public void setTypePlace(String typePlace) {
		this.typePlace = typePlace;
	}


	public List<String> getAddress() {
		return address;
	}


	public void setAddress(List<String> address) {
		this.address = address;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public List<String> getContact() {
		return contact;
	}


	public void setContact(List<String> contact) {
		this.contact = contact;
	}


	public String getCreator() {
		return creator;
	}


	public void setCreator(String creator) {
		this.creator = creator;
	}
	
		
	
	
}
