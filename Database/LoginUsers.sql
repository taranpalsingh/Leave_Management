
	use Leave_Management;

GO
--###########################################

	drop table userLogin
	drop procedure verifyLogin
	drop procedure addUser


GO
--###########################################


	create table userLogin(

		ID int primary key identity(1,1),
		username nvarchar(20) foreign key references Employee(Email),
		passwordHash binary(64) not null
	)


GO
--###########################################


	create procedure verifyLogin @username varchar(20), @password varchar(20)
	as
	begin	
		if exists(select 1 from userLogin where username=@username and passwordHash = HASHBYTES('SHA2_512', @password))
			--select fname from userLogin where username=@username and passwordHash = HASHBYTES('SHA2_512', @password)
			select Id as id from Employee where Email = @username
		else
			select '0' as id
	end


GO
--###########################################


	create procedure addUser @username varchar(20), @password varchar(20)
	as
	begin
		if exists(select 1 from userLogin where username=@username)
		begin
			if exists(select 1 from userLogin where username=@username and passwordHash = HASHBYTES('SHA2_512', @password) )
				select 'User already exists.' --+ (select fname from userLogin where username=@username and passwordHash = HASHBYTES('SHA2_512', @password) )
		end
		else 
		begin
			insert into userLogin values(@username, HASHBYTES('SHA2_512',@password))
			select @username + ' added'
		end
	end

GO

--###########################################

	EXEC verifyLogin 'Taran.singh', '123'

	EXEC addUser 'taran.singh','123'
	EXEC addUser 'sahil.sharma','123'
	EXEC addUser 'vishal.ranjan','admin'

