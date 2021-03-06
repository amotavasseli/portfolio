USE [C49_StrokeWars]
GO
/****** Object:  StoredProcedure [dbo].[LMSDocumentResponses_getsavedcontent]    Script Date: 3/29/18 3:21:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[LMSDocumentResponses_getsavedcontent]
	@user_id int,
	@doc_id int
AS
/*
execute LMSDocumentResponses_getsavedcontent 1379, 110
*/

SELECT 
	id, 
	contents, 
	time_spent_in_sec, 
	date_submitted 

FROM LMSDocumentResponses

WHERE user_id = @user_id AND doc_id = @doc_id
