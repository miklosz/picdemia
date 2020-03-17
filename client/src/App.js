import React from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'loading',
            searchTerm: '',
            results: ''
        }
        this.settings = {
            "url": "//127.0.0.1:8080/api/search",
            "options": {
                "method": "GET",
            },
        }
    }

    handleFetchedData(data) {
        console.log(data)
    }

    componentDidMount() {
        fetch(this.settings.url, this.settings.options)
            .then(resource => resource.json())
            .then(data => this.handleFetchedData(data, this))
            .catch(error => {
                this.setState({ status: "Error fetching data" });
                this.handleFetchedData(error)
            })
    }

    render() {
        return (
            <div className="App">
                <Header />
                <main>
                    <Search />
                    <Results searchTerm={this.state.searchTerm} results={this.state.results}/>
                </main>
            </div>
        );
    }
}