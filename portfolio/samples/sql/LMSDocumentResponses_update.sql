USE [C49_StrokeWars]
GO
/****** Object:  StoredProcedure [dbo].[LMSDocumentResponses_update]    Script Date: 3/29/18 3:22:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[LMSDocumentResponses_update]
	@id int,
	@user_id int,
	@doc_id int,
	@feedback nvarchar(MAX),
	@content nvarchar(MAX),
	@time_spent float,
	@date_submitted datetime2(7)

AS

/*
   ---------------Use this template as test code---------------
DECLARE @id int

EXECUTE LMSDocumentResponses_update
	@id = 3,
	@user_id = 3,
	@doc_id = 21,
	@feedback = '["feedback"]',
	@content = 'my content',
	@time_spent = 234.22,
	@date_submitted = '2018-02-28 04:12:06.0466667'

SELECT * FROM LMSDocumentResponses
	
*/

UPDATE LMSDocumentResponses

SET 
	user_id = @user_id,
	doc_id = @doc_id,
	feedback = @feedback,
	contents = @content,
	time_spent_in_sec = @time_spent,
	date_submitted = @date_submitted,
	date_modified = GETUTCDATE()

WHERE id = @id