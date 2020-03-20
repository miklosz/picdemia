import React from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';
import Hints from './Hints'
import styles from './App.module.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'new',
            query: '',
            hints: [],
            page: 1
        }
        this.settings = {
            "url": "/api/search/",
            "options": {
                "method": "GET",
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNextResults = this.handleNextResults.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.query) {
            let updatedHints = [...new Set([...this.state.hints,this.state.query])]
            this.setState({
                status: 'loading',
                results: [],
                hints: updatedHints
            })
            this.fetchData(this.state.query);
        }
    }
    
    handleChange(event) {
        this.setState({
            query: event.target.value
        });
    }

    handleLink(hintKey) {
        event.preventDefault();
        this.setState({
            query: hintKey,
            status: 'loading',
            results: [],
        });
        this.fetchData(hintKey);
    }

    handleNextResults() {
        event.preventDefault();
        let toPage = this.state.page + 1;

        this.fetchData(`${this.state.query}/${toPage}`); 
        this.setState({
            page: toPage
        });
    }

    fetchData(query) {
        fetch(this.settings.url + query, this.settings.options)
            .then(resource => resource.json())
            .then(data => {
                this.setState({
                    results: this.state.results.concat(data.pictures),
                    status: 'loaded',
                    resultsQuery: data.query,
                    total: data.total
                })
            })
            .catch(error => {
                this.setState({ status: `Error fetching data ${error}` });
            })
    }

    render() {
        return (
            <div className={`${styles.wrapper} ${styles[this.state.status]}`}>
                <div className={styles.top}>
                    <Header />
                    <Search onChange={this.handleChange} onSubmit={this.handleSubmit} query={this.state.query} />
                </div>
                <main>
                    {this.state.hints.length > 0 && <Hints onClick={(id) => this.handleLink(id)} hints={this.state.hints}/>}
                    {this.state.results && <Results query={this.state.resultsQuery} results={this.state.results} total={this.state.total} more={this.handleNextResults} status={this.state.status}/>}
                </main>
            </div>
        );
    }
}