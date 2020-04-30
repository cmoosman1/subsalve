import './CaseStudy.scss'

class CaseStudy extends React.Component {   
    constructor(){
        super();
    
        this.state = {
            featured: null,
            isMobileNavOpen: false,
          
        }
    }

    componentWillMount(){
        this.setState({featured: this.props});
    }   

    render() {
        const {featured} = this.state;
        return (
            <div className="case-study-feature-wrapper">
                <div className="row">
                    <div className="col-md-7 image-wrapper">
                        <img src={featured.fields.images[0].image.url} alt="FeaturedImage"/>
                    </div>
                    <div className="col-md-5 pl-4 pr-5">
                        <div className="featured-case-study mt-3">
                            Featured <i className="fas fa-circle featured-case-study-grey-circle"></i> <span className="case-study">{featured.fields.feature_title}</span>
                        </div>
                        <h3 className="case-study-title mt-3 mb-3">{featured.fields.title}</h3>
                        <hr className="case-study-divider"/>
                        <div className="case-study-content mb-3">
                            {featured.fields.content}
                        </div>
                        <a href={`/${featured.fields.link.post_name}`} className="btn case-study-button">View Case Study</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CaseStudy;