package sopra.ux.gae;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

import sopra.ux.gae.Place;

@PersistenceCapable
public class Address {
	
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;
	@Persistent
	private String street;
	@Persistent
	private String zipcode;
	@Persistent
	private String city;
	@Persistent
	private String country;
	@Persistent
	private String fullAddress;
	@Persistent
	private String latitude;
	@Persistent
	private String longitud;
	
	@Persistent(mappedBy = "address")
    private Place place;
	
	public Key getKey() {
		return key;
	}


	public void setKey(Key key) {
		this.key = key;
	}


	public String getFullAddress() {
		return fullAddress;
	}

	public void setFullAddress(String fullAddress) {
		this.fullAddress = fullAddress;
	}

	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitud() {
		return longitud;
	}
	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}

	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	}


	public Address(String street, String zipcode, String city, String country,
			String fullAddress, String latitude, String longitud, Place place) {
		super();
		this.street = street;
		this.zipcode = zipcode;
		this.city = city;
		this.country = country;
		this.fullAddress = fullAddress;
		this.latitude = latitude;
		this.longitud = longitud;
	}
	
	public Address() {
		super();
	}
	
	
}
