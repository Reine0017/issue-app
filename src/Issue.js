import React from "react";
import Card from "@material-ui/core/Card"

const Issue = (props) => {
    console.log("props from issue", props)
    console.log("props.issue.fields.ID", props.issue.fields.ID)
    return(
        <div>
            {props.issue ? (
            <div>
                <Card>
                    <div>ID: {props.issue.fields.ID}</div>
                    <div>Title: {props.issue.fields.Title}</div>
                    <div>Description: {props.issue.fields.Description}</div>
                    <div>Status: {props.issue.fields.Status}</div>
                </Card>
                <br></br>
            </div>)
            : (<div>NO</div>)}
        </div>
    )
}

export default Issue;