DROP TABLE DAY;

CREATE TABLE DAY(
   Day_Id int NOT NULL UNIQUE AUTO_INCREMENT,
   day varchar(7)
);

INSERT INTO DAY (day) VALUES ('O');
INSERT INTO DAY (day) VALUES ('M');
INSERT INTO DAY (day) VALUES ('L');
INSERT INTO DAY (day) VALUES ('S');
INSERT INTO DAY (day) VALUES ('SAT');
INSERT INTO DAY (day) VALUES ('SUN');
INSERT INTO DAY (day) VALUES ('R');
INSERT INTO DAY (day) VALUES ('P');
INSERT INTO DAY (day) VALUES ('K');
INSERT INTO DAY (day) VALUES ('M-F');
INSERT INTO DAY (day) VALUES ('WED');
INSERT INTO DAY (day) VALUES ('MTTF');
INSERT INTO DAY (day) VALUES ('Q');

-----------

DROP TABLE WORK_DAY;

CREATE TABLE WORK_DAY(
	Work_Day_Id int NOT NULL UNIQUE AUTO_INCREMENT,
	Day_Id int NOT NULL,
	Work_Id int NOT NULL
);

INSERT INTO WORK_DAY (Day_Id, Work_Id) VALUES (13, 101);
INSERT INTO WORK_DAY (Day_Id, Work_Id) VALUES (13, 102);
INSERT INTO WORK_DAY (Day_Id, Work_Id) VALUES (2, 103);
INSERT INTO WORK_DAY (Day_Id, Work_Id) VALUES (3, 104);

------------

CREATE TABLE RUN_TYPE(
	Run_Type_Id int NOT NULL UNIQUE AUTO_INCREMENT,
	Type varchar(50)
);

CREATE TABLE RUN(
   Run_Id int NOT NULL UNIQUE AUTO_INCREMENT,
   Work_Id int NOT NULL,
   Route_Number int NOT NULL ,
   Run_Number int,
   Day varchar(3),
   Release_Point varchar(4),
   Time_On time,
   Time_Off time,
   End_Point varchar(4),
   Platform_Time time,
   Report_Time time,
   Travel_Time time,
   Pays time,
   Spread_Time time,
   Driver_Id int,
   Special_Details text,
   Is_ShowUp boolean,
   Run_Type_Id int
);


-------------


DROP TABLE WORK;

CREATE TABLE WORK(
   Work_Id int NOT NULL UNIQUE,
   Has_Details boolean,
   Employee_Id int
);

INSERT INTO WORK (Work_Id, Has_Details)
VALUES (101, false);

INSERT INTO WORK (Work_Id, Has_Details)
VALUES (102, false);

INSERT INTO WORK (Work_Id, Has_Details)
VALUES (103, false);

INSERT INTO WORK (Work_Id, Has_Details)
VALUES (104, false);



DROP TABLE RUN;

CREATE TABLE RUN(
   Run_Id int NOT NULL UNIQUE AUTO_INCREMENT,
   Work_Id int NOT NULL,
   Route_Number int,
   Run_Number int,
   Days_On_Id int,
   Release_Point_Id int,
   Time_On time,
   Time_Off time,
   End_Point_Id int,
   Platform_Time time,
   Report_Time time,
   Travel_Time time,
   Pays time,
   Spread_Time time,
   Special_Details text,
   Is_ShowUp boolean
);

INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (101, 1, 1, 10, 4,  '06:22:00', '02:48:00', 1, '08:26:00', '00:15:00', null, '08:45:00', null, false);

INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (101, 14, 7, 5, 4,  '06:34:00', '02:59:00', 2, '08:25:00', '00:15:00', null, '08:45:00', null, false);


INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (102, 1, 2, 10, 4,  '07:35:00', '12:09:00', 10, null, null, null, null, null, false);

INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (102, 14, 1, 10, 2,  '02:50:00', '06:16:00', 9, '08:00:00', '00:15:00', null, '08:15:00', '00:45:00', false);

INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (102, 1, 3, 5, 4,  '06:23:00', '11:27:00', 10, null, null, null, null, null, false);

INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (102, 21, 7, 5, 8,  '02:00:00', '05:00:00', 5, '08:04:00', '00:15:00', null, '08:15:00', '00:30:00', false);


INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (103, 1, 3, 10, 4,  '05:49:00', '03:24:00', 1, '09:35:00', '00:15:00', null, '10:00:00', null, false);

INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (103, 16, 3, 5, 4,  '06:46:00', '04:29:00', 3, '09:43:00', '00:15:00', null, '10:00:00', null, false);


INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (104, 1, 4, 10, 4,  '06:16:00', '03:39:00', 1, '09:23:00', '00:15:00', null, '10:00:00', null, false);

INSERT INTO RUN (Work_Id, Route_Number, Run_Number, Days_On_Id, Release_Point_Id, Time_On, Time_Off, End_Point_Id, Platform_Time, Report_Time, Travel_Time, Pays, Spread_Time, Is_ShowUp)
VALUES (104, 1, 2, 5, 4,  '05:53:00', '03:25:00', 10, '09:32:00', '00:15:00', null, '10:00:00', null, false);


DROP TABLE WORK_DAY;

CREATE TABLE WORK_DAY(
	Work_Day_Id int NOT NULL UNIQUE AUTO_INCREMENT,
	Day_Id int NOT NULL,
	Work_Id int NOT NULL
);

INSERT INTO WORK_DAY(Day_Id, Work_Id) VALUES (1, 101);

INSERT INTO WORK_DAY(Day_Id, Work_Id) VALUES (1, 102);

INSERT INTO WORK_DAY(Day_Id, Work_Id) VALUES (2, 103);

INSERT INTO WORK_DAY(Day_Id, Work_Id) VALUES (3, 104);



-----------


DROP TABLE EMPLOYEE;

CREATE TABLE EMPLOYEE (
	Employee_Id 			int NOT NULL UNIQUE,
	First_Name 				varchar(50) NOT NULL,
	Last_Name 				varchar(100) NOT NULL,
	Email 					varchar(50) NOT NULL,
	Date_Of_Birth 			date NOT NULL,
	User_Name 				varchar(100) NOT NULL,
	Password 				varchar(255) NOT NULL, 
	Salt 					varchar(255) NOT NULL, 
	Account_Confirmation 	boolean,
    Is_Allowed				boolean,
    Bid_Time				datetime
);

DROP TABLE BID_SCHEDULE;

CREATE TABLE BID_SCHEDULE(
	Bid_Schedule_Id 		int NOT NULL UNIQUE AUTO_INCREMENT,
	Start_Time 				datetime NOT NULL,
	End_Time 				datetime NOT NULL
);

INSERT INTO BID_SCHEDULE (Start_Time, End_Time)
VALUES ('2017-10-13 13:00:00', '2017-10-13 13:10:00');


-------------
DROP TABLE LOCATION;

CREATE TABLE LOCATION (
	Location_Id		int NOT NULL UNIQUE AUTO_INCREMENT,
	Location_Code	varchar(7)
);

INSERT INTO LOCATION (Location_Code) VALUES ('DWS');
INSERT INTO LOCATION (Location_Code) VALUES ('HIBS');
INSERT INTO LOCATION (Location_Code) VALUES ('DAS');
INSERT INTO LOCATION (Location_Code) VALUES ('G-H');
INSERT INTO LOCATION (Location_Code) VALUES ('RK');
INSERT INTO LOCATION (Location_Code) VALUES ('DCW');
INSERT INTO LOCATION (Location_Code) VALUES ('HAHW');
INSERT INTO LOCATION (Location_Code) VALUES ('RC');
INSERT INTO LOCATION (Location_Code) VALUES ('HIBN');
INSERT INTO LOCATION (Location_Code) VALUES ('DWN');
