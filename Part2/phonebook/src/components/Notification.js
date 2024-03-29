import React from "react";

const Notification = ({message, errorStatus}) => {
    const notificationStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const currStyle = errorStatus ? errorStyle : notificationStyle
    if (message === null){
        return null
    }

    return (
        <div style={currStyle} className="error">
            {message}
        </div>
    )
}

export default Notification