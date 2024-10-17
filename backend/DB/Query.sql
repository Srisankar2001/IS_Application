CREATE TABLE `is_db`.`booking_table` (
  `booking_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `vechile_no` VARCHAR(255) NOT NULL,
  `message` TEXT(1000) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `mileage` INT NOT NULL,
  PRIMARY KEY (`booking_id`));
