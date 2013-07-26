package sopra.ux.gae.dao;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import sopra.ux.gae.model.Event;

public enum Dao {
  INSTANCE;

  @SuppressWarnings("unchecked")
public List<Event> listEvents() {
    EntityManager em = EMFService.get().createEntityManager();
    // Read the existing entries
    Query q = em.createQuery("select m from Event m");
    List<Event> events = q.getResultList();
    return events;
  }
/*
  public void add(String host, String summary, String description, String url,
			List<People> audience, List<Tag> tags, Place place) {
    synchronized (this) {
      EntityManager em = EMFService.get().createEntityManager();
      Event event = new Event(host, summary, description, url, audience, tags, place);
      em.persist(event);
      em.close();
    }
  }*/
  
  public void add(String host, String title, String description, String url,
			String dateStart, String dateEnd, List<String> audience,
			List<String> tags, List<String> address) {
  synchronized (this) {
    EntityManager em = EMFService.get().createEntityManager();
    Event event = new Event(host,title,description,url,dateStart,dateEnd,audience,tags,address);
    em.persist(event);
    em.close();
  }
}

  @SuppressWarnings("unchecked")
public List<Event> getEvents(String host) {
    EntityManager em = EMFService.get().createEntityManager();
    Query q = em
        .createQuery("select t from Event t where t.host = :host");
    q.setParameter("host", host);
    List<Event> events = q.getResultList();
    return events;
  }

  public void remove(long id) {
    EntityManager em = EMFService.get().createEntityManager();
    try {
      Event event = em.find(Event.class, id);
      em.remove(event);
    } finally {
      em.close();
    }
  }
} 