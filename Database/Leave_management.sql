

	use Leave_Management	
go

	drop table LeaveRequest
	drop table Projects
	drop table CM
	drop table Employee
	drop table Leaves
 
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

go

	drop  procedure InsertLeaveRequest
	drop  procedure PrintTables
	drop  procedure InsertDataEmployee
	drop  procedure InsertAdmin
	drop  procedure InsertLeaves
	drop  procedure ReviewerSeeLeaveRequest 
	drop  procedure EmployeeSeeLeaveRequestsLog
	drop  procedure ReviewLeaveRequest 
	drop  procedure EmployeeSeeLeaveSummary
	drop  procedure EmployeeById
	drop  procedure InsertProject
	drop  procedure ProjectByEmployeeId
	drop  procedure TypesOfLeaves
	drop  procedure getCMOfEmployee
go

	create procedure PrintTables
	as
		select * from Employee
		select * from Leaves
		select * from LeaveRequest
		select * from Projects
		select * from CM
go

	create procedure InsertLeaves
	(
		@Name nvarchar(20),
		@Total int
	)
	as
		SET NOCOUNT ON;
		Insert into  Leaves values(@Name, @Total);
		
		SET NOCOUNT OFF
go

--delete from employee

	drop  procedure InsertAdmin

	create procedure InsertAdmin
		(
		@FirstName nvarchar(20),
		@LastName nvarchar(20),
		@Gender nvarchar(20),
		@DOB Date,
		@Email nvarchar(20) = NULL,
		@DateOfJoining date = NULL,
		@TotalExperience int = NULL
		--@DOB Date = NULL
		)
	as
		SET NOCOUNT ON;
		--set @DateOfJoining = ISNULL( @DateOfJoining, CONVERT(VARCHAR(10), getdate(), 103));
		set @DateOfJoining = ISNULL( @DateOfJoining, getdate());
		
		set @Email = ISNULL(@Email, (Lower(@FirstName)+'.'+Lower(@LastName)));
		
		--set @DOB = ISNULL( @DOB, CONVERT(VARCHAR(10), '1996/4/13', 103));
		
		insert into Employee values( @FirstName, @LastName, CONVERT(VARCHAR(20),@DOB), @Gender, @Email, @DateOfJoining, @TotalExperience)
		
		SET NOCOUNT OFF;
go
	create procedure InsertDataEmployee
		(
		@FirstName nvarchar(20),
		@LastName nvarchar(20),
		--@DOB Date,
		@Gender nvarchar(20),
		@CMId int,
		@Email nvarchar(20) = NULL,
		@DateOfJoining date = NULL,
		@TotalExperience int = NULL,
		@DOB Date = NULL
		)
	as
		SET NOCOUNT ON;
		
		set @DateOfJoining = ISNULL( @DateOfJoining, getdate());
		set @Email = ISNULL(@Email, (Lower(@FirstName)+'.'+Lower(@LastName)));
		set @DOB = ISNULL( @DOB, CONVERT(VARCHAR(10), '1996/4/13', 103));
		
		if not exists(select * from Employee where Id = @CMId)
			THROW 51000, 'CM does not exists.', 1;  

		insert into Employee values( @FirstName, @LastName, CAST(@DOB as date), @Gender, @Email, @DateOfJoining, @TotalExperience)
		
		
		Declare @EmployeeId int;
		SET @EmployeeId = SCOPE_IDENTITY();
		Insert into CM values(@CMId, @EmployeeId);
		
		SET NOCOUNT OFF;
go
	
	create procedure InsertLeaveRequest(
		@EmployeeId int, 
		@Type varchar(20), 
		@LeaveFrom date,
		@LeaveTo date,
		@Reason nvarchar(255)=NULL
		)
	as
		SET NOCOUNT ON;
		Declare @Status nvarchar(20);
		Declare @RequestedOn date;
		Declare @Total int;
		Declare @ReviewerId int;
		Declare @TypeOfLeave int;
	
		if (@LeaveFrom > @LeaveTo)
			THROW 51000, 'FROM date must be less than TO date.', 1;  

		Select @ReviewerId = CMId from CM where EmployeeId = @EmployeeId;
		Select @TypeOfLeave = Id from Leaves where Name = @Type;
		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'User does not exists.', 1;  

		if not exists(select * from Employee where Id = @ReviewerId )
			THROW 51000, 'The Reviewer does not exists.', 1;

		if (@EmployeeId = @ReviewerId)
			THROW 51000, 'The User and the Reviewer cannot be the same.', 1;

		set @Status = 'Pending';
		set @RequestedOn = CONVERT(varchar(10), GETDATE(), 103);
		set @Total = DATEDIFF(day, @LeaveFrom, @LeaveTo);
		
		Insert into LeaveRequest values(@EmployeeId, @TypeOfLeave, @Status, @LeaveFrom, @LeaveTo, @Total, @ReviewerId, @RequestedOn, @Reason, NULL);
		
		SET NOCOUNT OFF;
go

	create procedure ReviewerSeeLeaveRequest(
		@ReviewerId int
		)
	as
		-- Assuming: The request is generated only if it is possible to take that leave 
		SET NOCOUNT ON;
		Declare @Status nvarchar(20);

		if not exists(select * from Employee where Id = @ReviewerId)
			THROW 51000, 'Reviewer does not exists.', 1;  

		Select * from LeaveRequest 
		where ReviewerId = @ReviewerId;
		
		SET NOCOUNT OFF;
go
	
	create procedure EmployeeSeeLeaveRequestsLog(
		@EmployeeId int
		)
	as
		-- Assuming: The request is generated only if it is possible to take that leave 
		SET NOCOUNT ON;

	--	Declare @Name int;
	
	--	Select @Name = FirstName+LastName from Employee
	--	where Id = @EmployeeId;

		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Employee does not exists.', 1;  

		Select Status,LeaveFrom,LeaveTo, Total, RequestedOn, Reason,
		(select FirstName+' '+LastName from Employee where Id = ReviewerId) as Reviewer,
		(select Name from Leaves where Id = TypeOfLeave) as Type
		from LeaveRequest 
		where EmployeeId = @EmployeeId;
		
		SET NOCOUNT OFF;
go

	create procedure ReviewLeaveRequest(
		@RequestId int,
		@ReviewerId int,
		@ReviewerRemark nvarchar(255),
		@Status nvarchar(20)
		)
	as
		SET NOCOUNT ON;
		if not exists(select * from LeaveRequest where Id = @RequestId)
			THROW 51000, 'NO such request exists.', 1;  
		if not exists(select * from LeaveRequest where ReviewerId = @ReviewerId)
			THROW 51000, 'Reviewer does not have the required permissions.', 1;
			  
		Update LeaveRequest
		SET 
			ReviewerRemark = @ReviewerRemark, 
			Status = @Status
		WHERE
			ReviewerId = @ReviewerId and
			Id = @RequestId 
		
		SET NOCOUNT OFF;
go
	
	create procedure EmployeeSeeLeaveSummary(
		@EmployeeId int
		)
	as
		-- Assuming: The request is generated only if it is possible to take that leave 
		
		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Reviewer does not exists.', 1;  

		select 
			L.Name, 
			L.Total,
			(L.Total - (select count(*) from LeaveRequest where EmployeeId =  @EmployeeId  and Status = 'Approved' and TypeOfLeave = (Select id from Leaves where Name = L.Name))) as Balance,
			(select count(*) from LeaveRequest where EmployeeId = @EmployeeId  and Status = 'Pending' and TypeOfLeave = (Select id from Leaves where Name = L.Name)) as Pending,
			(select count(*) from LeaveRequest where EmployeeId = @EmployeeId  and Status = 'Approved' and TypeOfLeave = (Select id from Leaves where Name = L.Name)) as Approved,
			(select count(*) from LeaveRequest where EmployeeId = @EmployeeId  and Status = 'Rejected' and TypeOfLeave = (Select id from Leaves where Name = L.Name)) as Rejected

		from Leaves as L
		left join LeaveRequest as LR on L.Id = LR.TypeOfLeave
		and LR.EmployeeId = @EmployeeId 
		group by L.Name, L.Total
		
		SET NOCOUNT OFF;
go

	create procedure InsertProject(
		@EmployeeId int, 
		@Name VARCHAR(50), 
		@StartDate date = NULL,
		@EndDate date = NULL
		)
	as
		SET NOCOUNT ON;
		
		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'User does not exists.', 1;  

		if (@StartDate < @EndDate)
			THROW 51000, 'Start date must be less than End date.', 1;  

		set @StartDate = ISNULL( @StartDate, CONVERT(VARCHAR(10), getdate(), 103));

		Insert into Projects values(@EmployeeId, @Name, @StartDate, @EndDate);
		
		SET NOCOUNT OFF;
go

	create procedure EmployeeById(
		@EmployeeId int
		)
	as
		SET NOCOUNT ON;

		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Employee does not exists.', 1;  

		SELECT Id,FirstName, LastName, DOB, Gender, Email from EMPLOYEE
		WHERE Id = @EmployeeId;
		
		SET NOCOUNT OFF;
go

	create procedure ProjectByEmployeeId(
		@EmployeeId int
		)
	as
		SET NOCOUNT ON;

		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Employee does not have any Current Projects.', 1;  

		SELECT * from Projects
		WHERE EmployeeId = @EmployeeId;
		
		SET NOCOUNT OFF;
go
	create procedure TypesOfLeaves
	as
		SET NOCOUNT ON;

		SELECT Id, Name from Leaves
			
		SET NOCOUNT OFF;
go

	create procedure getCMOfEmployee(
		@EmployeeId int
	)
	as
		SET NOCOUNT ON;

		--Declare @CM int;
		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Employee does not exists.', 1;
		
		select FirstName+' '+LastName as Name from Employee where Id = (select CMId from CM where EmployeeId=@EmployeeId)  

	go
	
	


