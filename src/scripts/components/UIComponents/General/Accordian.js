import './Accordian.scss'

class Accordian extends React.Component {
    constructor() {
        super();

        this.state = {
            accordianToggle: null,
            isMobileNavOpen: false,
            currentIndex: null,
            targetedIndex: null,
            tableToggle: null,
            tableDataClass: '',
            tableData: false,
        }
    }

    handleClick = (e) => {
        let accordianIndex = Number(e.target.dataset.index);
        let numOfAccordions = this.props.fields.acf.accordion_content_sections.length;
        if (accordianIndex === numOfAccordions) {
            this.setState({
                currentIndex: accordianIndex,
                accordianToggle: !this.state.accordianToggle
            }, () => {
                this.handleProductSpecsToggle()
            })
        } else {
            this.setState({
                currentIndex: accordianIndex,
                tableToggle: false,
                tableDataClass: 'fas fa-plus-circle',
                accordianToggle: !this.state.accordianToggle
            })
        }
    }

    switchClasses = (index) => {
        if (this.state.currentIndex === index) {
            return 'fas fa-minus-circle'
        } else {
            return 'fas fa-plus-circle'
        }
    }

    handleProductSpecsToggle = () => {
        if (this.state.tableToggle) {
            this.setState({
                currentIndex: this.props.fields.acf.accordion_content_sections.length,
                tableToggle: false,
                tableDataClass: 'fas fa-plus-circle',

            })
        } else {
            this.setState({
                tableToggle: true,
                tableDataClass: 'fas fa-minus-circle',
            })
        }
    }

    componentWillMount() {
        const hasTableData = this.props.fields.acf.product_details;
        
        if (hasTableData) {
            this.setState({
                tableToggle: true,
                tableData: true,
                tableDataClass: 'fas fa-minus-circle',
                accordianToggle: false
            })
        } 
        else {
            this.setState({
                accordianToggle: false,
            })
        }
    }

    render() {
        const pageFields = this.props.fields.acf;
        return (
            <div id="accordion">
                {pageFields.accordion_content_sections.map((tabItem, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="card-header mt-2" id="headingOne"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                data-index={index}
                                href={`#collapse${index}`}
                                onClick={this.handleClick}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                            >
                                <div className="row">
                                    <div className="table-title col-11">{tabItem.section_header}</div>
                                    
                                        <i
                                            data-toggle="collapse"
                                            data-index={index}
                                            className={(this.state.currentIndex === index && this.state.accordianToggle) ? 'fas fa-minus-circle' : 'fas fa-plus-circle'}
                                            style={{ color: '#000819', fontSize: '24px' }}
                                        ></i>
                                    
                                </div>
                            </div>
                            <div id={`collapse${index}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                    <p style={{ paddingLeft: '15px' }} dangerouslySetInnerHTML={{ __html: tabItem.section_content }} />
                                </div>
                            
                        </div>
                    )
                })
                }
                {this.state.tableData &&
                    <div className="card">
                        <div className="card-header mt-2" id="headingOne">
                            <div className="row">
                                <div className="table-title col-11">Product Specifications</div>
                                <button
                                    className="col-1 btn btn-link"
                                    data-toggle="collapse"
                                    data-target="#collapseTwo"
                                    data-index={pageFields.accordion_content_sections.length}
                                    aria-expanded="true"
                                    aria-controls="collapseTwo"
                                    onClick={this.handleClick}
                                >
                                    <i data-toggle="collapse"
                                        data-index={pageFields.accordion_content_sections.length}
                                        className={this.state.tableDataClass}
                                        style={{ color: '#000819', fontSize: '24px' }}></i>
                                </button>
                            </div>
                        </div>
                        <div id="collapseTwo" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="table-mobile-wrapper">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {pageFields.product_details.header.map((headerTitle, index) => {
                                                return (
                                                    <th key={index} scope="col">
                                                        {headerTitle.c}
                                                    </th>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageFields.product_details.body.map((bodyContent, index) => {
                                            return (
                                                <tr>
                                                    {bodyContent.map((row, index) => {
                                                        return (
                                                            <td scope="row" key={index}>
                                                                {row.c}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div >
        );
    }
}

export default Accordian;
