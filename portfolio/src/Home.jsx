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
                <img src={css3Logo} className="logo" style={{"animationDelay": "0.5s"}} alt="CSS3"/>
                <img src={javascriptLogo} className="logo" style={{"animationDelay": "1s"}} alt="JavaScript"/>
                <img src={jQueryLogo} className="logo" style={{"animationDelay": "1.5s"}} alt="jQuery"/>
                <img src={reactLogo} className="logo" style={{"animationDelay": "2s"}} alt="React"/>
                <img src={angularLogo} className="logo" style={{"animationDelay": "2.5s"}} alt="AngularJS"/>
                <img src={es6Logo} className="logo" style={{"animationDelay": "3s"}} alt="ES6"/>
                <img src={bootstrapLogo} className="logo" style={{"animationDelay": "3.5s"}} alt="Bootstrap"/>
                <img src={dNetLogo} className="logo" style={{"animationDelay": "4s"}} alt=".NET"/>
                <img src={cLogo} className="logo" style={{"animationDelay": "4.5s"}} alt="C#"/>
                <img src={tsqlLogo} className="logo" style={{"animationDelay": "5s"}} alt="T-SQL"/>
                <img src={redisLogo} className="logo" style={{"animationDelay": "5.5s"}} alt="Redis"/>
                <img src={gitLogo} className="logo" style={{"animationDelay": "6s"}} alt="Git"/>
                <img src={githubLogo} className="logo" style={{"animationDelay": "6.5s"}} alt="GitHub"/>
                <img src={gulpLogo} className="logo" style={{"animationDelay": "7s"}} alt="gulp"/>
                <img src={jsonLogo} className="logo" style={{"animationDelay": "7.5s"}} alt="JSON"/>
                
            </div>
        )
    }
}
export default Home; 