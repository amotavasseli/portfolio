USE [C49_StrokeWars]
GO
/****** Object:  StoredProcedure [dbo].[Faqs_getall]    Script Date: 3/29/18 3:56:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[Faqs_getall]

AS

SELECT 
		f.id, 
		f.question, 
		f.answer,
		f.date_created, 
		f.date_modified,
		(
			SELECT tag 
			FROM Tags AS t
			JOIN Faqs_Tags AS ft
			ON f.id = ft.faq_id
			WHERE ft.tag_id = t.id
			FOR JSON AUTO
		)

FROM Faqs AS f 