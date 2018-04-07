import React from 'react';
import reactLogo from './logos/react.svg';
import html5Logo from './logos/html5.svg';
import css3Logo from './logos/css3.svg';
import javascriptLogo from './logos/javascript.svg';
import jQueryLogo from './logos/jquery.svg';
import angularLogo from './logos/angular.svg';
import es6Logo from './logos/es6.svg';
import bootstrapLogo from './logos/bootstrap.svg';
import dNetLogo from './logos/dotnet.svg';
import cLogo from './logos/csharp.png';
import tsqlLogo from './logos/tsql.jpg';
import redisLogo from './logos/redis.svg';
import gitLogo from './logos/git.svg';
import githubLogo from './logos/github.svg';
import gulpLogo from './logos/gulp.svg';
import jsonLogo from './logos/json.svg';

class Home extends React.Component{


    render(){
        return (
            <div className="logos">
            
                <img src={html5Logo} className="logo" alt="HTML5"/>
                <img src={css3Logo} className="logo" alt="CSS3"/>
                <img src={javascriptLogo} className="logo" alt="JavaScript"/>
                <img src={jQueryLogo} className="logo" alt="jQuery"/>
                <img src={reactLogo} className="logo" alt="React"/>
                <img src={angularLogo} className="logo" alt="AngularJS"/>
                <img src={es6Logo} className="logo" alt="ES6"/>
                <img src={bootstrapLogo} className="logo" alt="Bootstrap"/>
                <img src={dNetLogo} className="logo" alt=".NET"/>
                <img src={cLogo} className="logo" alt="C#"/>
                <img src={tsqlLogo} className="logo" alt="T-SQL"/>
                <img src={redisLogo} className="logo" alt="Redis"/>
                <img src={gitLogo} className="logo" alt="Git"/>
                <img src={githubLogo} className="logo" alt="GitHub"/>
                <img src={gulpLogo} className="logo" alt="gulp"/>
                <img src={jsonLogo} className="logo" alt="JSON"/>
                
            </div>
        )
    }
}
export default Home; 