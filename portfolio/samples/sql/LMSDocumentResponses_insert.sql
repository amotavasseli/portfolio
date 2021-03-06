USE [C49_StrokeWars]
GO
/****** Object:  StoredProcedure [dbo].[LMSDocumentResponses_insert]    Script Date: 3/29/18 4:06:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[LMSDocumentResponses_insert]
	@id int OUTPUT,
	@doc_id int,
	@user_id int,
	@time_spent float,
	@feedback nvarchar(MAX),
	@content nvarchar(MAX),
	@date_submitted datetime2(7)

AS
/*
   ---------------Use this template as test code---------------
DECLARE @id int

EXECUTE LMSDocumentResponses_insert
	@doc_id = 21,
	@user_id = 3,
	@time_spent = 234.22,
	@feedback = '["feedback"]',
	@content = 'my content',
	@id = @id OUTPUT

*/
INSERT INTO LMSDocumentResponses
	(doc_id,
	user_id,
	time_spent_in_sec,
	feedback,
	contents,
	date_submitted)

VALUES 
	(@doc_id,
	@user_id,
	@time_spent,
	@feedback,
	@content,
	@date_submitted)

SET @id = SCOPE_IDENTITY();