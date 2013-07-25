package sopra.ux.gae.model;

/**
 * Model class which will store the Place details
 * 
 * @author misaqui -  Sopra Group - UX
 * 
 */
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Place {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String longitud;
	private String latitude;
	private String fulladress;
	private List<String> placeType;
	private String city;
	private String country;

	public List<String> getPlaceType() {
		return placeType;
	}

	public void setPlaceType(List<String> placeType) {
		this.placeType = placeType;
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

	public Place() {

	}

	public String getLongitud() {
		return longitud;
	}

	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getFulladress() {
		return fulladress;
	}

	public void setFulladress(String fulladress) {
		this.fulladress = fulladress;
	}

	public Place(String name, String email, String phone) {
		super();
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}