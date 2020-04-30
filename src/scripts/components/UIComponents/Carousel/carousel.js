class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            isMobile: false,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
    
        componentDidMount() {
            window.addEventListener("resize", this.updateWindowDimensions());
        }
        
        componentWillUnmount() {
            window.removeEventListener("resize", this.updateWindowDimensions)
        }

      updateWindowDimensions() {
        let mobileScroller = (window.innerWidth <= 468);
        if (mobileScroller !== this.state.isMobile) {
            this.setState({isMobile: mobileScroller});
        }
      }
    render() {
        
        const { fields } = this.props;
        const { isMobile } = this.state;
        return (
            <div className="slider-wrapper" style={{padding: '.8rem .8rem', margin: '0 auto'}}>
                <div className="container">
                    <div className="row text-center" style={{    display: 'inline'}}>
                        <h3 className="slider-header">Trusted by</h3>
                    </div>
                    <div className="row text-center">
                        <div id="carouselControls" className="carousel slide mb-5" data-ride="carousel" style={{width: '100%', height: '70px'}}>
                        {!isMobile &&
                                <ul className="carousel-inner">
                                    <li className="carousel-item active">
                                        {fields.trustedLogos.slice(0, 4).map((company, i) => {
                                            return(
                                                
                                                    <img key={company.id} className="img-fluid w-20 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(4, 8).map((company, i) => {
                                        return(
                                                
                                                    <img key={company.id} className="img-fluid w-20 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(8, 12).map((company, i) => {
                                        return(
                                                
                                                    <img key={company.id} className="img-fluid w-20 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(12, 16).map((company, i) => {
                                        return(
                                                
                                                    <img key={company.id} className="img-fluid w-20 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(16, 18).map((company, i) => {
                                        return(
                                                
                                            <img key={company.id} className="img-fluid w-20 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                            </ul>
                            }
                            {isMobile &&
                                <ul className="carousel-inner">
                                    <li className="carousel-item active">
                                        {fields.trustedLogos.slice(0, 2).map((company, i) => {
                                            return(
                                                
                                                    <img key={company.id} className="img-fluid w-40 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(2, 6).map((company, i) => {
                                        return(
                                                
                                                    <img key={company.id} className="img-fluid w-40 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(6, 8).map((company, i) => {
                                        return(
                                                
                                                    <img key={company.id} className="img-fluid w-40 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(8, 10).map((company, i) => {
                                        return(
                                                
                                                    <img key={company.id} className="img-fluid w-40 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(10, 12).map((company, i) => {
                                        return(
                                                
                                            <img key={company.id} className="img-fluid w-40 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(12, 14).map((company, i) => {
                                        return(
                                                
                                            <img key={company.id} className="img-fluid w-40 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                                    <li className="carousel-item">
                                    {fields.trustedLogos.slice(14, 16).map((company, i) => {
                                        return(
                                                
                                            <img key={company.id} className="img-fluid w-40 pl-2 pr-2" src={company.acf.company_logo.url} alt="Logo"/>
                                                
                                            )
                                        })}
                                    </li>
                            </ul>
                            }
                            <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon slider-arrow-color" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon slider-arrow-color" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Carousel;
