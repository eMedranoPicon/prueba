package sopra.ux.gae;
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import sopra.ux.gae.dao.Dao;

public class ServletRemoveEvent extends HttpServlet {
  private static final long serialVersionUID = 1L;

  public void doGet(HttpServletRequest req, HttpServletResponse resp)
  throws IOException {
    String id = req.getParameter("id");
    Dao.INSTANCE.remove(Long.parseLong(id));
    resp.sendRedirect("/EventApplication.jsp");
  }
} 