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
//import sopra.ux.gae.model.People;
//import sopra.ux.gae.model.Place;
//import sopra.ux.gae.model.Tag;

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

    String title = checkNull(req.getParameter("title"));
    String description = checkNull(req.getParameter("description"));
    String url = checkNull(req.getParameter("url"));
    String dateStart = checkNull(req.getParameter("dateStart"));
    String dateEnd = checkNull(req.getParameter("dateEnd"));
    String audience = req.getParameter("audience");
    List<String> audienceList = Arrays.asList(audience.split(","));
    String tags = req.getParameter("tags");
    List<String> tagsList = Arrays.asList(tags.split(","));
    String address = checkNull(req.getParameter("address"));
    //List<People> audience = null;
    //List<Tag> tags = null;
    //Place place = null;
    //People host = null;

    Dao.INSTANCE.add(user.getUserId(), title, description, url, dateStart, dateEnd, audienceList, tagsList, address);
    resp.sendRedirect("/EventApplication.jsp");
  }

  private String checkNull(String s) {
    if (s == null) {
      return "";
    }
    return s;
  }
} 