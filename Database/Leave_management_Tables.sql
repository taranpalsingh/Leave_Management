use Leave_Management	
go

--/*
	drop table LeaveRequest
	drop table Projects
	drop table CM
	--drop table userLogin
	drop table Employee
	drop table Leaves
-- */

go

create table Employee(
	Id int primary key identity(1,1),
	FirstName nvarchar(20) NOT NULL,
	LastName nvarchar(20) NULL,
	DOB Date NOT NULL,
	Gender nvarchar(20) NOT NULL,
	Email nvarchar(20) NOT NULL unique,
	DateOfJoining date NOT NULL,
	TotalExperience int NULL
	)

go

create table CM(
	CMId int foreign key references Employee(Id) NOT NULL,
	EmployeeId int foreign key references Employee(Id) NOT NULL
	)
go

create table Projects(
	Id int primary key identity(1,1),
	EmployeeId int foreign key references Employee(Id),
	Name nvarchar(20) NOT NULL,
	StartDate date,
	EndDate date
	)
go

create table Leaves(
	Id int primary key identity(1,1),
	Name nvarchar(20) NOT NULL,
	Total int NOT NULL
	)
go


create table LeaveRequest(
	Id int primary key identity(1,1),
	EmployeeId int foreign key references Employee(Id), 
	TypeOfLeave int foreign key references Leaves(Id) NOT NULL, 
	Status nvarchar(20) NOT NULL,
	LeaveFrom date NOT NULL,
	LeaveTo date NOT NULL,
	Total int,
	ReviewerId int foreign key references Employee(Id) NOT NULL, 
	RequestedOn date,
	Reason nvarchar(255) NOT NULL,
	ReviewerRemark nvarchar(255)
	)


	--drop table DateTest
	/*create table DateTest(
		d Date
		)*/