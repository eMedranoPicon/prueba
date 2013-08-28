package sopra.ux.gae;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import sopra.ux.gae.Address;
import sopra.ux.gae.Contact;

@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class Place {
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long id;
	@Persistent
	private String namePlace;
	@Persistent
	private String typePlace;
	@Persistent
	private String description;
	@Persistent
	private String creator;
	
	
	@Persistent(defaultFetchGroup = "true")
	private Address address;	
	@Persistent(defaultFetchGroup = "true")
	private Contact contact;
	
	
	public Place() {
		super();
	}
	
	

	public Place(String namePlace, String typePlace, Address address,
			String description, Contact contact, String creator) {
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


	public Address getAddress() {
		return address;
	}


	public void setAddress(Address address) {
		this.address = address;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Contact getContact() {
		return contact;
	}


	public void setContact(Contact contact) {
		this.contact = contact;
	}


	public String getCreator() {
		return creator;
	}


	public void setCreator(String creator) {
		this.creator = creator;
	}
}
