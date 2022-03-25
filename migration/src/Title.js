// src/Title.js
import React, {Component} from 'react'
import moment from "moment";
import './Title.css';


const PagerDutyLogo = require('./images/PagerDutyLogo.jpg');

function getConsultant() {
    return "Replace Name with login data"; /* To be replaced by consultant data */
}


class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consultantName: getConsultant(),
            startDate: moment().format("MM-DD-YYYY - hh:mm")
        }
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
                    </table>

                </td>
            </div>
        )
    }
}

export default Title