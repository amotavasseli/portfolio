import React from 'react';
import Highlight from 'react-highlight';

class SQLinsert extends React.Component {


    render(){
        return (
            <Highlight className="sql">
                {
                    `
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
                    `
                }
            </Highlight>
        )
    }
}

export default SQLinsert; 