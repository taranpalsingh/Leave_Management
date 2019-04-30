	USE Leave_Management
go
	EXEC InsertAdmin N'Bhopi', N'Singh', '1967/10/13' , N'M' --, 'vishal.ranjan'
		
go
	EXEC InsertDataEmployee N'Vishal', N'Ranjan', '1987/1/2', N'M', 1, 'vishal.ranjan'
	EXEC InsertDataEmployee N'Taran', N'Singh', '1997/10/23' , N'M', 2 -- 'taran.singh'
	EXEC InsertDataEmployee N'Sahil', N'Sharma', '1997/12/03' , N'M', 2  -- 'sahil.sharma'
	EXEC InsertDataEmployee N'Kalp', N'Bist', '1996/1/13' , N'M', 2 , 'kb.bist', '2014/12/03' 
	EXEC InsertDataEmployee N'Shruti', N'Bhati', N'1996/4/13' , N'F', 2 , 'shruti.bhati', N'2014/11/03', 2

go

	EXEC InsertLeaves N'Casual', 6;
	EXEC InsertLeaves N'Sick', 5;
	EXEC InsertLeaves N'Earned', 5;
	EXEC InsertLeaves N'Leave Without Pay', 15;
	EXEC InsertLeaves N'Work From Home', 3;
go
	EXEC InsertLeaveRequest 6, 'Casual', N'2019/10/23', N'2019/10/25', N'Family Function'
	EXEC InsertLeaveRequest 4, 'Casual', '2019/10/23', '2019/10/24', N'Family Reeasons'
	EXEC InsertLeaveRequest 4, 'Casual', '2019/10/23', '2019/10/24', N'Fun'
	--EXEC InsertLeaveRequest 4, 1, '2019/10/26', '2019/10/24', N'Fun' -- Error Check command
go
	EXEC ReviewerSeeLeaveRequest 2
	
go
	EXEC ReviewLeaveRequest 1, 1, 'have Fun', 'Approved'
	EXEC ReviewLeaveRequest 2, 1, 'Sorry', 'Rejected'

go
	
	EXEC InsertProject 2,'DLass'
	EXEC InsertProject 3,'Dell',@EndDate = '2019-07-07'
	EXEC InsertProject 4,'Dell',@EndDate = '2019-07-07'
	EXEC InsertProject 5,'Siepe'
	EXEC InsertProject 6,'DLass'

go
	EXEC PrintTables
go
	EXEC EmployeeSeeLeaveSummary 3;
	EXEC EmployeeSeeLeaveSummary 4;

go
	ProjectByEmployeeId 2
	getCMOfEmployee 2



/*
	insert into Employee values (N'Bhopi', N'Singh', N'1967/10/13' , N'M', 'bhopi.singh', N'1987/10/13', 40)
	insert into Employee values (N'Vishal', N'Ranjan', N'1987/11/3' , N'M', 'vishal.ranjan', N'1997/10/13', 20)
	insert into Employee values (N'Taran', N'Pal Singh', N'1997/10/23' , N'M', 'taran.singh', N'2017/1/13', 40)
	insert into Employee values (N'Sahil', N'Sharma', N'1997/12/23' , N'M', 'sahil.sharma', N'2017/1/13', 20)
	insert into Employee values (N'Kb', N'Bist', N'1997/3/2' , N'M', 'kb.bist', N'2017/1/13', 20)
	insert into Employee values (N'Shruti', N'Khanna', N'1998/2/23' , N'F', 'shruti.khanna', N'2017/1/13', 1)
	
	select * from Employee
	select * from CM
	Insert into CM values(1,2)
	Insert into CM values(2,3)
	Insert into CM values(2,4)
	Insert into CM values(2,5)
	Insert into CM values(2,6)
*/

