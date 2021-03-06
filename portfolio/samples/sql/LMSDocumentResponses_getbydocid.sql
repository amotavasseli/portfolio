USE [C49_StrokeWars]
GO
/****** Object:  StoredProcedure [dbo].[LMSDocumentResponses_getbydocid]    Script Date: 3/29/18 3:21:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[LMSDocumentResponses_getbydocid]
	@doc_id int
AS

SELECT 
	l.id,
	l.user_id,
	l.doc_id,
	l.contents,
	l.feedback,
	l.time_spent_in_sec,
	l.date_submitted,
	u.first_name,
	u.last_name,
	u.email

FROM LMSDocumentResponses AS l
INNER JOIN 
Users AS u ON l.user_id = u.id 

WHERE l.doc_id = @doc_id