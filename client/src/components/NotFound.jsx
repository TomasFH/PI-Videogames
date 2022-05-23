import React, { Component } from "react";
import styles from "./NotFound.module.css";

export default class NotFound extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            alert: true,
            message: props.message
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({alert: false});
            this.props.clearMessageFunction();
        }, 5000);
    }

    render() {

        const {alert, message} = this.state;

        (message)? console.log(message) : console.log("Na q ver");


        return(
            (alert)? (
                <div className={styles.notFoundContainer}>
                    <div className={styles.notFoundMsg}>
                        There are not videogames that matches with that genre. Try with another one.
                    </div>
                </div>) :
            null
        )
    }
}