package sopra.ux.gae;

import sopra.ux.gae.PMF;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.datanucleus.query.JDOCursorHelper;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

@Api(name = "place", version = "v1", description = "BBVA - Place API")
public class PlaceEndpoint {

	/**
	 * This method lists all the entities inserted in datastore. It uses HTTP
	 * GET method and paging support.
	 * 
	 * @return A CollectionResponse class containing the list of all entities
	 *         persisted and a cursor to the next page.
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listPlace")
	public CollectionResponse<Place> listPlace(
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {

		PersistenceManager mgr = null;
		Cursor cursor = null;
		List<Place> execute = null;
		

		try {
			mgr = getPersistenceManager();
			//
			mgr.getFetchPlan().setMaxFetchDepth(2);
			//
			Query query = mgr.newQuery(Place.class);
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				HashMap<String, Object> extensionMap = new HashMap<String, Object>();
				extensionMap.put(JDOCursorHelper.CURSOR_EXTENSION, cursor);
				query.setExtensions(extensionMap);
			}

			if (limit != null) {
				query.setRange(0, limit);
			}

			execute = (List<Place>) query.execute();
			cursor = JDOCursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and
			// accomodate
			// for lazy fetch.
			for (Place obj : execute)
				;
		} finally {
			mgr.close();
		}

		return CollectionResponse.<Place> builder().setItems(execute)
				.setNextPageToken(cursorString).build();
	}

	/**
	 * This method gets the entity having primary key id. It uses HTTP GET
	 * method.
	 * 
	 * @param id
	 *            the primary key of the java bean.
	 * @return The entity with primary key id.
	 */
	@ApiMethod(name = "getPlace")
	public Place getPlace(@Named("id") Long id) {
		PersistenceManager mgr = getPersistenceManager();
		Place place = null;
		try {
			place = mgr.getObjectById(Place.class, id);
		} finally {
			mgr.close();
		}
		return place;
	}

	/**
	 * This inserts a new entity into App Engine datastore. If the entity
	 * already exists in the datastore, an exception is thrown. It uses HTTP
	 * POST method.
	 * 
	 * @param place
	 *            the entity to be inserted.
	 * @return The inserted entity.
	 */
	@ApiMethod(name = "insertPlace")
	public Place insertPlace(Place place) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			if (place.getId() != null) {
					//touch place
					place.setAddress(place.getAddress());
					place.setContact(place.getContact());
				if (containsPlace(place)) {
					throw new EntityExistsException("Object already exists");
				}
			}
			mgr.makePersistent(place);
		} finally {
			mgr.close();
		}
		return place;
	}

	/**
	 * This method is used for updating an existing entity. If the entity does
	 * not exist in the datastore, an exception is thrown. It uses HTTP PUT
	 * method.
	 * 
	 * @param place
	 *            the entity to be updated.
	 * @return The updated entity.
	 */
	@ApiMethod(name = "updatePlace")
	public Place updatePlace(Place place) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			if (!containsPlace(place)) {
				throw new EntityNotFoundException("Object does not exist");
			}
			//touch place
			place.setAddress(place.getAddress());
			place.setContact(place.getContact());
			mgr.makePersistent(place);
		} finally {
			mgr.close();
		}
		return place;
	}

	/**
	 * This method removes the entity with primary key id. It uses HTTP DELETE
	 * method.
	 * 
	 * @param id
	 *            the primary key of the entity to be deleted.
	 */
	@ApiMethod(name = "removePlace")
	public void removePlace(@Named("id") Long id) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			Place place = mgr.getObjectById(Place.class, id);
			mgr.deletePersistent(place);
		} finally {
			mgr.close();
		}
	}

	private boolean containsPlace(Place place) {
		PersistenceManager mgr = getPersistenceManager();
		boolean contains = true;
		try {
			mgr.getObjectById(Place.class, place.getId());
		} catch (javax.jdo.JDOObjectNotFoundException ex) {
			contains = false;
		} finally {
			mgr.close();
		}
		return contains;
	}

	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}

}
