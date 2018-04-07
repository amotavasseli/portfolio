import React from 'react';
import Highlight from 'react-highlight';

class SQLselect extends React.Component {


    render(){
        return (
            <Highlight className="sql">
                {
                    `
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
                    `
                }
            </Highlight>
        )
    }
}

export default SQLselect; 