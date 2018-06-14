USE bookings_module;

DELETE 
t1 
FROM unavailable_dates t1
  INNER JOIN unavailable_dates t2
  WHERE t1.id < t2.id
  AND t1.listing_id = t2.listing_id
  AND t1.date_booked = t2.date_booked;