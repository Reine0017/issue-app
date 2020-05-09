//import React, {useState} from 'react';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
//import { makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';

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
            query: this.state.searchString
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
                                id="searchInput" 
                                label="Search for issues" 
                                variant="outlined" 
                                InputProps={{classes: {
                                    input: classes.input,
                                    notchedOutline: classes.notchedOutline}
                                }}
                                onChange = {this.onSearchInputChange}
                            />

                            <Grid container spacing={3}>
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

// const useStyles = makeStyles((theme) => ({
//     notchedOutline: {
//         borderWidth: "1px",
//         borderColor: "purple"
//     },

//     input: {
//         color: "purple"
//     }
//   }));

// export default function SearchIssue() {
//     const classes = useStyles();
//     const [issues, setIssues] = useState([]);
//     const [searchString, setSearchString] = useState('');

//     const getIssues = () => {
//         client.getEntries({
//             query: searchString
//         })
//         .then((response) => {
//             setIssues({issues: response.items})
//             console.log(issues)
//         })
//         .catch((error) => {
//             console.log("error while fetching issues")
//             console.error(error)
//         })
//     }

//     const onSearchInputChange = (event) => {
//         console.log("Search changed ..." + event.target.value)
//         if (event.target.value) {
//             setSearchString({searchString: event.target.value})
//             console.log(searchString)
//         } else {
//             setSearchString({searchString: ''})
//         }
//         getIssues();
//     }

//     return (
//         <div>
//             {issues ? 
//                 (<div>
//                     <TextField 
//                         id="searchInput" 
//                         label="Search" 
//                         variant="outlined"
//                         InputProps={{
//                             classes: {
//                                 input: classes.input,
//                                 notchedOutline: classes.notchedOutline
//                             }
//                         }}
//                         onChange = {onSearchInputChange}
//                     />
//                     <Grid container>
//                         {issues.map(currentIssue => (<Grid item><Issue issue={currentIssue}/></Grid>))}
//                     </Grid>
//                 </div>)
//                 : 
//                 "no issues found"
//             }


                    
            

//         </div>
//     );
// }

