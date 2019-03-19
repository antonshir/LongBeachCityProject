import React from "react";
import axios from "axios";
import Businesses from "../components/Business";


class BusinessList extends React.Component {
    state = {
        businesses: []
    };

    // fetchArticles = () => {
    //     axios.get("http://127.0.0.1:8000/api/").then(res => {
    //         this.setState({
    //             businesses: res.data
    //         });
    //     });
    // }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/").then(res => {
            this.setState({
                businesses: res.data
            });
        });
    }

    // componentWillReceiveProps(newProps) {
    //     if (newProps.token) {
    //         this.fetchArticles();
    //     }
    // }

    render() {
        return (
                <Businesses data={this.state.businesses}/>
        )
    }
}

export default BusinessList;