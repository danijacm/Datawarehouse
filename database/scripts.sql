CREATE TABLE regions (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
region VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE countries (
id CHAR(3) NOT NULL,
country VARCHAR(80) NOT NULL,
region_id INT UNSIGNED NOT NULL,
FOREIGN KEY (region_id) REFERENCES regions (id) ON UPDATE CASCADE,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE cities (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
city VARCHAR(80) NOT NULL,
country_id CHAR(3) NOT NULL,
FOREIGN KEY(country_id) REFERENCES countries(id) ON UPDATE CASCADE,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE companies (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
company VARCHAR(60) NOT NULL,
city_id INT UNSIGNED NOT NULL,
address VARCHAR (100) NOT NULL,
email VARCHAR (100) NOT NULL,
phone VARCHAR (50) NOT NULL,
FOREIGN KEY(city_id) REFERENCES cities(id) ON UPDATE CASCADE,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE channel (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
channel VARCHAR(70) NOT NULL,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE contacts (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
email VARCHAR(100) NOT NULL,
name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
position VARCHAR(50) NOT NULL,
phone VARCHAR(20) NOT NULL,
adress VARCHAR(100) NOT NULL,
city_id INT UNSIGNED NOT NULL,
company_id INT UNSIGNED NOT NULL,
interesting ENUM ('0','25%','50%','75%','100%') NOT NULL,
FOREIGN KEY(company_id) REFERENCES companies(id) ON UPDATE CASCADE,
FOREIGN KEY(city_id) REFERENCES cities(id) ON UPDATE CASCADE,
PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE contact_channel (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
contact_id INT UNSIGNED NOT NULL,
channel_id INT UNSIGNED NOT NULL,
account VARCHAR(255) NOT NULL,
preference ENUM ('Sin preferencias','Canal favorito', 'No molestar') NOT NULL,
FOREIGN KEY(contact_id) REFERENCES contacts(id) ON UPDATE CASCADE,
FOREIGN KEY(channel_id) REFERENCES channel(id) ON UPDATE CASCADE,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE profiles (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
profile VARCHAR(50) NOT NULL,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE users (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
name VARCHAR(60) NOT NULL,
lastname VARCHAR(60) NOT NULL,
email VARCHAR(100) NOT NULL,
profile_id INT UNSIGNED NOT NULL,
passw VARCHAR(50) NOT NULL,
FOREIGN KEY(profile_id) REFERENCES profiles(id) ON UPDATE CASCADE,
PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO channel (id,channel) VALUES
(1,'phone_number'),
(2,'Whatsapp'),
(3,'Instagram'),
(4,'Linkedin'),
(5,'Facebook');

INSERT INTO regions (region) VALUES
('America del Norte'),
('America del Sur'),
('Centroamerica'),
('Europa'),
('Asia'),
('Africa');

INSERT INTO countries (id, country, region_id) VALUES
('USA','Estados Unidos',1),
('CAN','Canada',1),
('MEX','Mexico',3),
('COS','Costa Rica',3),
('RPD','República Dominicana',3),
('PAN','Panama',3),
('NIC','Nicaragua',3),
('HON','Honduras',3),
('COL','Colombia',2),
('BRA','Brasil',2),
('ARG','Argentina',2),
('CHL','Chile',2),
('PER','Perú',2),
('URU','Uruguay',2),
('ECU','Ecuador',2),
('ALE','Alemania',4),
('FRA','Francia',4),
('ITL','Italia',4),
('RUS','Rusia',4),
('POR','Portugal',4),
('ESP','España',4),
('CHN','China',5),
('COR','Corea',5),
('JPN','Japón',5),
('SDF','Sudafrica',6),
('CMR','Cemerun',6),
('MRC','Marruecos',6),
('NIG','Nigeria',6),
('KNI','Kenia',6);

INSERT INTO cities (city, country_id) VALUES
('Bogotá','COL'),
('Buenos Aires','ARG'),
('Madrid','ESP'),
('Seúl','COR'),
('Santiago','CHL'),
('Lima','PER');

INSERT INTO profiles (profile) VALUES
('ADMIN'),
('USER');








