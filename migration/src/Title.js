// src/Title.js
import React, {Component} from 'react'
import moment from "moment";
import './Title.css';
import apiClient from "./http-common";

const PagerDutyLogo = require('./images/PagerDutyLogo.jpg');

function getConsultant() {
    return {name: 'Consultant Name From API', email: 'pcimule@pagerduty.com'}; /* To be replaced by consultant data */
}

let textSelectedProject = React.createRef();
let Ec2_endpoint = ""

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consultantName: getConsultant().name,
            startDate: moment().format("MM-DD-YYYY - hh:mm"),
            projectList: [],
            selectedProject: ''
        };
        this.handleChangeProjects = this.handleChangeProjects.bind(this);

    }

    componentDidMount() {
        console.log(getConsultant().email)
        apiClient.post('/getProjectList', { "email": getConsultant().email }).then(response => {
                const projectList  = response.data;
                this.setState({ projectList });
                console.log(projectList)
                this.setState({ Ec2_endpoint: projectList[0]});
                console.log(this.state.Ec2_endpoint)
                apiClient.post('/setProjectEc2bUrl', {"url": projectList[0].Ec2url}).then(response => {
                    console.log("Datos en la API", response.data)
                })
            })
    }

    handleChangeProjects(event) {
        this.setState({ selectedProject: textSelectedProject.current.value });
        console.log(textSelectedProject.current.value)
        const projectIndex = this.state.projectList.findIndex(obj => obj.value === textSelectedProject.current.value);
        apiClient.post('/setProjectEc2bUrl', {"url": this.state.projectList[projectIndex].Ec2url}).then(response => {
            console.log(response.data)
        })
    }

    render() {

        return (
            <div className="Title" align={'Left'}>
                <td className="center" style={{width: "20%"}}>
                    <img src={PagerDutyLogo} style={{width: "80%"}}/>
                </td>
                <td className="center" style={{width: "80%"}}>
                    <div style={{fontSize: 24, padding: "1px"}}>Migration V2.2</div>

                    <table>
                        <tr>
                            <div className="Title" align={'Left'} style={{fontSize: 14, padding: "1px"}}/>
                        </tr>
                        <tr>
                            <td width="60%">
                                <div className='group'>
                                    <label>Consultant_Name: </label>
                                    <input disabled={true} value={this.state.consultantName} name="consultantName"/>
                                </div>
                            </td>
                            <td width="35%">
                                <div className='group'>
                                    <label>Migration_Start_date: </label>
                                    <input disabled={true} value={this.state.startDate} name="startDate" />
                                </div>
                            </td>
                            <td width="5%"> </td>
                        </tr>
                        <td width="60%">
                            <div className='group'>
                                <label>Projects: </label>
                                <select ref={textSelectedProject} value={this.state.selectedProject} onChange={this.handleChangeProjects}>
                                    {this.state.projectList.map(option => <option value={option.value}>{option.value}</option>)}
                                </select>
                            </div>
                        </td>
                    </table>

                </td>
            </div>
        )
    }
}

export default Title
