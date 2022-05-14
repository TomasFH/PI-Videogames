import React, { Component } from "react";


export default class NotFound extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            alert: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({alert: false})
        }, 5000);
    }

    render() {

        const {alert} = this.state;

        return(
            (alert)? (<div>
                There are not videogames that matches with that genre. Try with another one.
            </div>) :
            null
        )
    }
}