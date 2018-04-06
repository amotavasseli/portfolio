USE [C49_StrokeWars]
GO
/****** Object:  StoredProcedure [dbo].[LMSDocumentResponses_getall]    Script Date: 3/29/18 3:20:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[LMSDocumentResponses_getall]

AS

SELECT 
	id, 
	user_id, 
	doc_id, 
	date_created,
	date_modified,
	feedback,
	contents,
	date_published,
	time_spent_in_sec,
	date_submitted


FROM
	LMSDocumentResponses