import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as contentful from 'contentful'

import Issue from './Issue'

const client = contentful.createClient({
    space: 'tovxzq6ixjkn',
    accessToken: '6wKfiCyPhTKLdAoDO9wg7Kk1E5tOlE7FOjG37wLicaA'
})


const styles = theme => ({
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "white !important"
    },

    input: {
        color: "purple"
    }
});

class SearchIssue extends Component {
    // state = {
    //     issues: [],
    //     searchString: ''
    // }

    constructor(){
        super()
        //this is wrong, shouldn't make API calls in the constructor
        // this.getIssues()
        this.state = {
            issues: [],
            searchString: ''
        }
    }

    componentDidMount(){
        this.getIssues();
    }

    getIssues = () => {
        client.getEntries({
            //works for techTags but not issue
            //content_type: "techTags",
            query: this.state.searchString,
            order: 'sys.createdAt'
        })
        .then((response) => {
            this.setState({issues: response.items})
            console.log(this.state.issues)
        })
        .catch((error) => {
            console.log("Error occured while fetching entries")
            console.log(error)
        })
    }

    onSearchInputChange = (event) => {
        console.log("Search changed ... " + event.target.value)
        if (event.target.value){
            this.setState({searchString: event.target.value})
        }else{
            this.setState({searchString: ''})
        }
        this.getIssues()
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                {
                    this.state.issues ? (
                        <div>
                            <TextField
                                style={{margin: 24}}
                                id="searchInput" 
                                label="Search for issues" 
                                variant="outlined" 
                                InputProps={{classes: {
                                    input: classes.input,
                                    notchedOutline: classes.notchedOutline}
                                }}
                                onChange={this.onSearchInputChange}
                            />

                            <Grid container spacing={5} style={{padding:20}}>
                                {this.state.issues.map(currentIssue => 
                                    (<Grid key={currentIssue.fields.ID} item xs={12} sm={6} lg={4} xl={3}>
                                        <Issue issue={currentIssue}/>
                                    </Grid>))}
                            </Grid>
                        </div>
                    ) : "No issues found"
                }
                
            </div>
        );
    }
}
export default withStyles(styles)(SearchIssue);
