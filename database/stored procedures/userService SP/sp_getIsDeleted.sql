CREATE OR ALTER PROCEDURE [dbo].[sp_getIsDeleted]
	@email	varchar(250)
as

set nocount on;

begin
	select	u._id,
			u.isDeleted
	from	users u where email = @email;
end;

