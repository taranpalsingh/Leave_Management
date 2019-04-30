
	use Leave_Management

go
--/*
	drop  procedure InsertLeaveRequest
	drop  procedure PrintTables
	drop  procedure InsertDataEmployee
	drop  procedure InsertAdmin
	drop  procedure InsertLeaves
	drop  procedure ReviewerSeeLeaveRequest 
	drop  procedure ReviewLeaveRequestByID
	drop  procedure EmployeeSeeLeaveRequestsLog
	drop  procedure ReviewLeaveRequest 
	drop  procedure EmployeeSeeLeaveSummary
	drop  procedure EmployeeById
	drop  procedure InsertProject
	drop  procedure ProjectByEmployeeId
	drop  procedure TypesOfLeaves
	drop  procedure getCMOfEmployee
--*/

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

	create procedure InsertAdmin
		(
		@FirstName nvarchar(20),
		@LastName nvarchar(20),
		@DOB Date,
		@Gender nvarchar(20),
		@Email nvarchar(20) = NULL,
		@DateOfJoining Date = NULL,
		@TotalExperience int = NULL
		)
	as
		SET NOCOUNT ON;
		--set @DateOfJoining = ISNULL( @DateOfJoining, CONVERT(VARCHAR(10), getdate(), 103));
	
		set @DateOfJoining = ISNULL( @DateOfJoining, getdate());
		set @Email = ISNULL(@Email, (Lower(@FirstName)+'.'+Lower(@LastName)));
		
		insert into Employee values( @FirstName, @LastName,  CAST(@DOB as date), @Gender, @Email, @DateOfJoining, @TotalExperience)
		
		SET NOCOUNT OFF;
go
	create procedure InsertDataEmployee
		(
		@FirstName nvarchar(20),
		@LastName nvarchar(20),
		@DOB Date,
		@Gender nvarchar(20),
		@CMId int,
		@Email nvarchar(20) = NULL,
		@DateOfJoining date = NULL,
		@TotalExperience int = NULL

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
		declare @Start date;
		declare @End date;
		declare @balance int;
		declare @actualTotal int;
		declare @isAdded int;
		declare @notEnoughBalance int;
	
		set @Status = 'Pending';
		set @RequestedOn =  GETDATE()
		set @Total = DATEDIFF(day, @LeaveFrom, @LeaveTo)+1;

		Set @Start = @LeaveFrom;
		Set @End= @LeaveTo;

		Select @TypeOfLeave = Id, @actualTotal = Total from Leaves where Name = @Type;
	
		select 
			@balance = ISNULL((select sum(Total) from LeaveRequest where EmployeeId =  @EmployeeId and TypeOfLeave = @TypeOfLeave and (Status= 'Pending' or Status= 'Approved')),0) 
		from Employee E
		where E.Id = @EmployeeId 
		
		--select @balance + @Total  as 'apparent'
		--select @actualTotal as 'actual'

		if(@balance + @Total > @actualTotal)
			THROW 51000, 'You do not have the required leave balance.', 1;  
	

		Select @ReviewerId = CMId from CM where EmployeeId = @EmployeeId;
		Select @TypeOfLeave = Id from Leaves where Name = @Type;

		
		if (@LeaveFrom > @LeaveTo)
		THROW 51000, 'FROM date must be less than TO date.', 1;  

		if not exists(select top 1 1 from Employee where Id = @EmployeeId)
			THROW 51000, 'User does not exists.', 1;  

		if not exists(select 1 from Employee where Id = @ReviewerId )
			--THROW 51000, 'The Reviewer does not exists.', 1;

		if (@EmployeeId = @ReviewerId)
			THROW 51000, 'The User and the Reviewer cannot be the same.', 1;

		if exists (
			select * from LeaveRequest
			where EmployeeId = @EmployeeId
			and
			(
					LeaveFrom between @Start and @End
					OR
					LeaveTo between @Start and @End
					OR
					@End between LeaveFrom and LeaveTo
			)
		)
			THROW 51000, 'There are some time clashes with your previous leave requests.', 1;
		else
		begin
			--select '1' as isAdded
			Insert into LeaveRequest values(@EmployeeId, @TypeOfLeave, @Status,  CAST(@LeaveFrom as date), CAST(@LeaveTo as date), @Total, @ReviewerId, CAST(@RequestedOn as date), @Reason, NULL);
		end

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

		
		Select 
			LR.Id as RequestId,
			E.FirstName+' '+E.lastName as Name,
			L.Name as Type, 
			LR.Status, 
			LR.LeaveFrom, 
			LR.LeaveTo, 
			LR.Total, 
			LR.Reason 
		from LeaveRequest LR
		join Employee E on E.Id = LR.EmployeeId
		join Leaves L on L.Id = LR.TypeOfLeave
		where ReviewerId = @ReviewerId;
		
		SET NOCOUNT OFF;
go

	create procedure ReviewLeaveRequestByID(
		@Id int
		)
	as
		-- Assuming: The request is generated only if it is possible to take that leave 
		SET NOCOUNT ON;
		Declare @Status nvarchar(20);

		if not exists(select * from LeaveRequest where Id = @Id)
			THROW 51000, 'Request does not exists.', 1;  

		Select 
			LR.Id as RequestId,
			E.FirstName+' '+E.lastName as Name,
			L.Name as Type, 
			LR.Status, 
			LR.LeaveFrom, 
			LR.LeaveTo, 
			LR.Total, 
			LR.Reason 
		from LeaveRequest LR
		join Employee E on E.Id = LR.EmployeeId
		join Leaves L on L.Id = LR.TypeOfLeave
		where ReviewerId = @Id;
		
		SET NOCOUNT OFF;
go

	create procedure EmployeeSeeLeaveRequestsLog(
		@EmployeeId int
		)
	as
		SET NOCOUNT ON;

		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Employee does not exists.', 1;  

		Select 
			LR.Status,
			LR.LeaveFrom,
			LR.LeaveTo, 
			LR.Total, 
			LR.RequestedOn, 
			LR.Reason,
			--(select FirstName+' '+LastName from Employee where Id = ReviewerId) as Reviewer,
			E.FirstName + ' ' + E.LastName as Reviewer,
			L.Name as Type
		from 
			LeaveRequest LR
			left join Leaves L on L.Id = LR.TypeOfLeave
			left join Employee E on E.Id = LR.ReviewerId
		where 
			EmployeeId = @EmployeeId;
		
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
	
		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Reviewer does not exists.', 1;  

		select 
			L.Name, 
			L.Total,
			(L.Total - ISNULL((select sum(Total) from LeaveRequest where EmployeeId =  @EmployeeId  and Status = 'Approved' and TypeOfLeave = (Select id from Leaves where Name = L.Name)),0)) as Balance,
			ISNULL((select sum(Total) from LeaveRequest where EmployeeId = @EmployeeId  and Status = 'Pending' and TypeOfLeave = (Select id from Leaves where Name = L.Name)),0) as Pending,
			ISNULL((select sum(Total) from LeaveRequest where EmployeeId = @EmployeeId  and Status = 'Approved' and TypeOfLeave = (Select id from Leaves where Name = L.Name)),0) as Approved,
			ISNULL((select sum(Total) from LeaveRequest where EmployeeId = @EmployeeId  and Status = 'Rejected' and TypeOfLeave = (Select id from Leaves where Name = L.Name)),0) as Rejected

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
		
		if not exists(select 1 from Employee where Id = @EmployeeId)
			THROW 51000, 'User does not exists.', 1;  

		if (@StartDate < @EndDate)
			THROW 51000, 'Start date must be less than End date.', 1;  

		set @StartDate = ISNULL( @StartDate, getdate());

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

		SELECT 
			Id, 
			FirstName, 
			LastName, 
			DOB, 
			Gender, 
			Email 
		from 
			EMPLOYEE
		WHERE 
			Id = @EmployeeId;
		
		SET NOCOUNT OFF;
go

	create procedure ProjectByEmployeeId(
		@EmployeeId int
		)
	as
		SET NOCOUNT ON;

		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Employee does not have any Current Projects.', 1;  

		SELECT 
			* 
		from 
			Projects
		WHERE 
			EmployeeId = @EmployeeId;
		
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

		Declare @CM int;
		
		if not exists(select * from Employee where Id = @EmployeeId)
			THROW 51000, 'Employee does not exists.', 1;
		
		select
			@CM = CMID
		from 
			CM
		where 
			EmployeeId = @EmployeeId

		select 
			E.FirstName + ' ' + E.LastName as Name 
		from 
			Employee E
		where 
			E.Id = @CM
go
	
