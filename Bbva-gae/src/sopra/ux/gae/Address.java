package sopra.ux.gae;

public class Address {
	
	private String street;
	private String zipcode;
	private String city;
	private String country;
	private String fullAddress;
	private String latitude;
	private String longitud;
	
		
	public Address(){
		super();
	}
		
	
	public Address(String street, String zipcode, String city, String country,
			String fullAddress, String latitude, String longitud) {
		super();
		this.street = street;
		this.zipcode = zipcode;
		this.city = city;
		this.country = country;
		this.fullAddress = fullAddress;
		this.latitude = latitude;
		this.longitud = longitud;
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
	
	

}
