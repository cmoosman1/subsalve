class Tile extends React.Component {
    render() {
        let divImageCSS = {
            backgroundImage: 'url(https://www.castlehotsprings.com/wp-content/uploads/2018/11/surrounding-oasis-pg-img03@3x.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'scroll',
            backgroundSize: 'cover'
        };
        let divTextCSS = {
            minHeight: '450px', 
        };
        const { name, title, description, email, heroUrl, iconUrl } = this.props;
        return (
            <div className="jumbotron mt-5">
                <div className="row">
                    <div className="col">
                        <div style={divImageCSS}>
                        </div>
                    </div>
                    <div className="col" style={divTextCSS}>
                        <div className="floating-info">
                            <h2>Lorem Ipsum is simply dummy text </h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tile;