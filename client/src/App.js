import React from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';
import Hints from './Hints'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'new',
            query: '',
            hints: []
        }
        this.settings = {
            "url": "//127.0.0.1:8080/api/search/",
            "options": {
                "method": "GET",
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleLink = this.handleLink.bind(this,hintKey);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            status: 'loading',
            results: '',
            hints: [...this.state.hints,this.state.query]
        })
        this.fetchData(this.state.query);
    }
    
    handleChange(event) {
        this.setState({
            query: event.target.value
        });
    }

    handleLink(hintKey) {
        event.preventDefault();
        console.log(hintKey)
        this.setState({
            query: hintKey,
            status: 'loading',
            results: '',
        });
        this.fetchData(hintKey);
    }

    fetchData(query) {
        fetch(this.settings.url + query, this.settings.options)
            .then(resource => resource.json())
            .then(data => {
                this.setState({
                    results: data.pictures,
                    status: 'list fetched',
                    resultsQuery: data.query //different from 'query' - returned by server
                })
            })
            .catch(error => {
                this.setState({ status: `Error fetching data ${error}` });
            })
    }

    render() {
        return (
            <div className="App">
                <Header />
                <main>
                    <Search onChange={this.handleChange} onSubmit={this.handleSubmit} query={this.state.query} />
                    {this.state.hints && <Hints onClick={(id) => this.handleLink(id)} hints={this.state.hints}/>}
                    {this.state.results && <Results query={this.state.resultsQuery} results={this.state.results} />}
                </main>
            </div>
        );
    }
}