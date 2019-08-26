import React, {Component} from 'react';

// Custom Components
import HeaderFive from './common/headers/header-five';
import FooterOne from "./common/footers/footer-one";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"

class App extends Component {

    render() {
        return (
            <div>
                <HeaderFive logoName={'logo.png'}/>
                {this.props.children}
                <FooterOne logoName={'logo.png'}/>

                <ThemeSettings />

            </div>
        );
    }
}

export default App;
