import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

class MainNav extends React.Component {
    constructor() {
        super();
        this.state = {
            isMobile: window.innerWidth <= 1298
        };
    }

    componentWillMount() {
        this.handleWindowSizeChange();
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        const windowResizedWidth = window.innerWidth <= 1298;
        if (windowResizedWidth !== this.state.isMobile) {
            this.setState({
                isMobile: windowResizedWidth
            })
        }
    }

    render() {
        if (this.state.isMobile) {
            return (
                <MobileNav />
            )
        } else {
            return (
                <DesktopNav />
            );
        }
    }
}

export default MainNav; 