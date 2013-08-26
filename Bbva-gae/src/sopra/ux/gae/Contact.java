package sopra.ux.gae;

public class Contact {
	
	private String name;
	private String email;
	
	public Contact(){
		super();		
	}
		
	public Contact(String name, String email) {
		super();
		this.name = name;
		this.email = email;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	

}
