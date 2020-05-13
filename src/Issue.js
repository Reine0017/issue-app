import React from "react";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const Issue = (props) => {
    console.log("props from issue", props.issue.fields)
    console.log("props.issue.fields.ID", props.issue.fields.ID)
    return(
        <div>
            {props.issue ? (
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h4"> Title: {props.issue.fields.Title}</Typography>
                        <Typography gutterBottom variant="h3">Status: {props.issue.fields.Status}</Typography>
                        <Typography>Description: {props.issue.fields.Description}</Typography>
                        <Typography component="p">ID: {props.issue.fields.ID}</Typography>
                    </CardContent>
                </Card>
                <br></br>
            </div>)
            : (<div>NO</div>)}
        </div>
    )
}

export default Issue;