import React, {Component} from 'react';

// Custom Components
import HeaderFive from './common/headers/header-five';
import FooterOne from "./common/footers/footer-one";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"
import FooterTwo from "./common/footers/footer-two";
import FooterThree from "./common/footers/footer-three";
import FooterFour from "./common/footers/footer-four";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <HeaderFive logoName={'logo.png'}/>
                {this.props.children}
                <FooterTwo logoName={'logo.png'}/>

                <ThemeSettings />

            </React.Fragment>
        );
    }
}

export default App;
