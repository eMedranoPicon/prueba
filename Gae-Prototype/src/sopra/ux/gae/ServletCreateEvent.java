package sopra.ux.gae;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import sopra.ux.gae.dao.Dao;

@SuppressWarnings("serial")
public class ServletCreateEvent extends HttpServlet {
  public void doPost(HttpServletRequest req, HttpServletResponse resp)
      throws IOException {
	  
    System.out.println("Creating new Event ");
    
    User user = (User) req.getAttribute("user");
    
    if (user == null) {
      UserService userService = UserServiceFactory.getUserService();
      user = userService.getCurrentUser();
      
    }
    String host="anonimo";
    //if (user.getUserId() != null) { 
    	//host = user.getUserId();        
      //}

    String title = checkNull(req.getParameter("title"));
    String description = checkNull(req.getParameter("description"));
    String url = checkNull(req.getParameter("url"));
    String dateStart = checkNull(req.getParameter("dateStart"));
    String dateEnd = checkNull(req.getParameter("dateEnd"));
    
    String audience = checkNull(req.getParameter("audience"));
    List<String> audienceList = Arrays.asList(audience.split(","));
    
    String tags = checkNull(req.getParameter("tags"));    
    List<String> tagsList = Arrays.asList(tags.split(","));
    
    String street = checkNull(req.getParameter("address"));
    String zipcode = checkNull(req.getParameter("zipcode"));
    String city = checkNull(req.getParameter("city"));
    String country = checkNull(req.getParameter("country"));    
    String longitud = checkNull(req.getParameter("longitud"));
    String latitude = checkNull(req.getParameter("latitude"));
    List<String> address = Arrays.asList(street, zipcode, city, country, longitud, latitude);

    Dao.INSTANCE.add(host, title, description, url, dateStart, dateEnd, audienceList, tagsList, address);
    resp.sendRedirect("/EventApplication.jsp");
  }

  private String checkNull(String s) {
    if (s == null) {
      return "";
    }
    return s;
  }
} 