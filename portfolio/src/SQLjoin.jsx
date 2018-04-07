import React from 'react';
import Highlight from 'react-highlight';

class SQLjoin extends React.Component {


    render(){
        return (
            <Highlight className="sql">
                {
                    `
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
                    `
                }
            </Highlight>
        )
    }
}

export default SQLjoin; 