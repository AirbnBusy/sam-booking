DROP DATABASE IF EXISTS bookings_module;

CREATE DATABASE bookings_module;

USE bookings_module;

CREATE TABLE listings (
  id int NOT NULL,
  base_rate_per_night int NOT NULL,
  max_guests int NOT NULL,
  cleaning_fee int NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE unavailable_dates (
  id int NOT NULL AUTO_INCREMENT,
  date_booked date NOT NULL,
  listing_id int NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(id)
);

CREATE TABLE bookings (
  id int NOT NULL AUTO_INCREMENT,
  listing_id int NOT NULL,
  user_id int NOT NULL,
  num_of_adults int NOT NULL,
  num_of_children int NULL,
  num_of_infants int NULL,
  num_of_nights int NOT NULL,
  service_fee int NOT NULL,
  mod_rate_per_night int NOT NULL,
  occupancy_taxes int NOT NULL,
  total_cost int NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(id)
);

CREATE INDEX unav_listing_index ON unavailable_dates(listing_id);
CREATE INDEX book_listing_index ON bookings(listing_id);
