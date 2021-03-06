package com.csci4050.bookstore.util;

import com.csci4050.bookstore.model.Category;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * This is a custom filter used to query for objects in the database. It is completely safe as it
 * uses the criteria api in hibernate. All comparisons are done as a String except in the case that
 * the model attribute returns a list. In this case, the value needs to be excplicitly converted to
 * the corresponding type. This is done to keep this filter as generic as possible. One thing to
 * note is that when dealing with LocalDateTime, the date string is stored as follows: yyyy-mm-dd
 * hh:mm:ss. The filter string needs to exactly match this when using == as this comparison is
 * explicit.
 *
 * <p>All operators and values in the filter string must be separated by space Any multi word value
 * must be enclosed by quotes Symbols in order of highest precedence to lowest: , - OR ; - AND == -
 * EQ (This and the rest are of equal precedence) != - NE > - GT < - LT >= - GTE <= - LTE
 */
public class Filter<T> {

  public static <T> CriteriaQuery<T> getQuery(
      Map<String, String> filters, CriteriaBuilder cb, Class<T> type)
      throws IllegalArgumentException, NoSuchFieldException {

    String orderBy = filters.get("orderBy");
    String filter = filters.get("filter");
    CriteriaQuery<T> q = cb.createQuery(type);
    Root<T> c = q.from(type);

    if (filter != null) {
      // string is split by space, but quoted entries are kept in tact
      q.where(parseFilter(filter.split("\\s(?=([^\"]*\"[^\"]*\")*[^\"]*$)"), cb, c, type));
    }

    // orders query
    if (orderBy != null && orderBy.matches("(\\+|\\-)\\w+")) {
      if (orderBy.charAt(0) == '+') {
        q.orderBy(cb.asc(c.get(orderBy.substring(1))));
      } else {
        q.orderBy(cb.desc(c.get(orderBy.substring(1))));
      }
    }

    return q;
  }

  private static <T> Predicate parseFilter(
      String[] filter, CriteriaBuilder cb, Root<T> c, Class<T> type)
      throws IllegalArgumentException, NoSuchFieldException {
    for (int i = 0; i < filter.length; i++) {
      filter[i] = filter[i].replaceAll("^\"|\"$", "");
    }
    if (filter.length > 0) {

      // OR operator
      for (int i = 0; i < filter.length; i++) {
        if (filter[i].equals(",")) {
          return cb.or(
              parseFilter(Arrays.copyOfRange(filter, 0, i), cb, c, type),
              parseFilter(Arrays.copyOfRange(filter, i + 1, filter.length), cb, c, type));
        }
      }

      // AND operator
      for (int i = 0; i < filter.length; i++) {
        if (filter[i].equals(";")) {
          return cb.and(
              parseFilter(Arrays.copyOfRange(filter, 0, i), cb, c, type),
              parseFilter(Arrays.copyOfRange(filter, i + 1, filter.length), cb, c, type));
        }
      }

      // base case
      if (filter.length == 3) {
        return base(filter, cb, c, type);
      }
    }
    throw new IllegalArgumentException();
  }

  private static <T> Predicate base(String[] filter, CriteriaBuilder cb, Root<T> c, Class<T> type)
      throws IllegalArgumentException, NoSuchFieldException {
    Object value = filter[2];

    // convert types that arent string/number
    switch (filter[0]) {
      case "categories":
        value = Category.valueOf(filter[2]);
        break;
    }
    for (String s : filter) {
      System.out.println(s);
    }
    // base case
    if (filter[1].equals(">")) {
      return cb.greaterThan(c.get(filter[0]).as(String.class), (String) value);
    } else if (filter[1].equals(">=")) {
      return cb.greaterThanOrEqualTo(c.get(filter[0]).as(String.class), (String) value);
    } else if (filter[1].equals("<")) {
      return cb.lessThan(c.get(filter[0]).as(String.class), (String) value);
    } else if (filter[1].equals("<=")) {
      return cb.lessThanOrEqualTo(c.get(filter[0]).as(String.class), (String) value);
    } else if (filter[1].equals("==")) {
      // check if attribute returns list
      if (Collection.class.isAssignableFrom(type.getDeclaredField(filter[0]).getType())) {
        return cb.isMember(value, c.get(filter[0]));
      } else {
        return cb.equal(c.get(filter[0]).as(String.class), (String) value);
      }

    } else if (filter[1].equals("!=")) {
      // check if attribute returns list
      if (Collection.class.isAssignableFrom(type.getDeclaredField(filter[0]).getType())) {
        return cb.isNotMember(value, c.get(filter[0]));
      } else {
        return cb.notEqual(c.get(filter[0]).as(String.class), (String) value);
      }
    } else {
      throw new IllegalArgumentException();
    }
  }
}
