
import React, { useReducer, useEffect, useState} from "react";
import './App.css';
import Title from './Title';
import apiClient from "./http-common";


export default function App(props) {
    // state variables for execution options
    const [getSelectedOption, setSelectedOption] = useState('');
    const [getQuickMode, setQuickMode] = useState(false);
    const [getInstanceType, setInstanceType] = useState('sourceInstance');
    const [getDeleteData, setDeleteData] = useState(true);
    const [getRunAll, setRunAll] = useState(false);
    const [getSelectedInstance, setSelectedInstances] = useState('all');
    const [getThreat, setThreat] = useState('thread_1');
    const [getTestMode, setTestMode] = useState(false);
    const [getUpdateUser, setUpdateUser] = useState(false);
    const [getDetectCollision, setDetectCollision] = useState(false);
    const [getRepopulateAWS, setRepopulateAWS] = useState(false);
    let testModeChecked = React.createRef();

    //state variables for settings file
    const [getSettings,setSettings]=useState({
        sourceName: '',
        sourceApiKey:'',
        sourceEmail: '',
        sourceUrl:'',
        targetName: '',
        targetApiKey: '',
        targetEmail: '',
        targetUrl: ''
    })

    const [getsourceName, setSourceName] = useState('');
    const [gettargetName, setTargetName] = useState('');
    const [getsourceApiKey, setSourceApiKey] = useState('');
    const [gettargetApiKey, setTargetApiKey] = useState('');
    const [getsourceEmail, setSourceEmail] = useState('');
    const [gettargetEmail, setTargetEmail] = useState('');
    const [getsourceUrl, setSourceUrl] = useState('');
    const [gettargetUrl, setTargetUrl] = useState('');

    //Variables used to get input values for settings file
    let textSourceName = React.createRef();
    let textSourceApiKey = React.createRef();
    let textSourceEmail = React.createRef();
    let textSourceUrl = React.createRef();
    let textTargetName = React.createRef();
    let textTargetApiKey = React.createRef();
    let textTargetEmail = React.createRef();
    let textTargetUrl = React.createRef();

    function handleInputChange(event) {
        event.preventDefault();
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('You clicked some submit.');
    }

    function genMigrationScript(event) {

        if (getSelectedOption.length === 0) {
            let message = "You must select some process before generating a run script";
            console.log(message);
            alert(message);

        } else {
            console.log("PROCESS SELECTED OPTIONS - >", getSelectedOption);

            if (getSelectedOption === "population") {
                console.log("Quick Mode -> ", getQuickMode);
                console.log("Instance to Populate -> ", getInstanceType);
                console.log("Delete all previous data -> ", getDeleteData);
                console.log("Run all endpoints -> ", getRunAll);

            } else if (getSelectedOption === "migration") {
                console.log("Selected Instance -> ", getSelectedInstance);
                console.log("Thread -> ", getThreat);
                console.log("Test Mode -> ", testModeChecked.current.checked);
                console.log("Update User -> ", getUpdateUser);
                console.log("Detect Collisions -> ", getDetectCollision);
                console.log("Repopulate AWS -> ", getRepopulateAWS);

            } else if (getSelectedOption === "teamMigration") {
                console.log("Quick Mode -> ", getQuickMode);
                console.log("Selected Instance -> ", getSelectedInstance);
                console.log("Thread -> ", getThreat);
                console.log("Test Mode -> ", testModeChecked.current.checked);
                console.log("Update User -> ", getUpdateUser);
                console.log("Detect Collisions -> ", getDetectCollision);
                console.log("Repopulate AWS -> ", getRepopulateAWS);

            }
        }
    }


    function setOnClick(event) {
        const id = event.target.id;
        console.log(id);
        alert(id);
    }

    function readSettings() {
        document.getElementById("settings").reset();
        apiClient.get('/readSettings').then((response) => {
            setSettings({
                sourceName: response.data["SOURCE"]["NAME"],
                sourceApiKey: response.data['SOURCE']['API_KEY_1'],
                sourceEmail: response.data['SOURCE']['EMAIL_1'],
                sourceUrl: response.data['SOURCE']['END_POINT_1'],
                targetName: response.data["TARGET"]["NAME"],
                targetApiKey: response.data['TARGET']['API_KEY_2'],
                targetEmail: response.data['TARGET']['EMAIL_2'],
                targetUrl: response.data['TARGET']['END_POINT_2'],
            });
            console.log(response.data);
        })
    };


    function updateSettings(event) {

        let jsonData = {
            "API_KEY_1": textSourceApiKey.current.value,
            "EMAIL_1": textSourceEmail.current.value,
            "END_POINT_1": textSourceUrl.current.value,
            "API_KEY_2": textTargetApiKey.current.value,
            "EMAIL_2": textTargetEmail.current.value,
            "END_POINT_2": textTargetUrl.current.value
        };

        console.log(jsonData);

        apiClient.put('/updateSettings', jsonData).then((response) => {
            setSettings({
                sourceName: response.data["SOURCE"]["NAME"],
                sourceApiKey: response.data['SOURCE']['API_KEY_1'],
                sourceEmail: response.data['SOURCE']['EMAIL_1'],
                sourceUrl: response.data['SOURCE']['END_POINT_1'],
                targetName: response.data["TARGET"]["NAME"],
                targetApiKey: response.data['TARGET']['API_KEY_2'],
                targetEmail: response.data['TARGET']['EMAIL_2'],
                targetUrl: response.data['TARGET']['END_POINT_2']
            });
            console.log(response.data);
        })
    };

    function renderOptions() {

        if(getSelectedOption === "population") {
            // Populate GraphDb Selected
            console.log("Process Selected - >", getSelectedOption)
            return  (
                <div onChange={handleInputChange}>
                    <table align="center" cellPadding="5" cellSpacing="1" border="5px" width="99.3%">
                        <tr>
                            <td><label><input type="checkbox" value="quickMode" defaultChecked={getQuickMode} onChange={event => setQuickMode(event.target.checked)}/>Quick Mode</label></td>
                            <td>
                                <select name="instanceType" defaultValue={getInstanceType} onChange={event => setInstanceType(event.target.value)}>
                                    <option value="sourceInstance">Source Instance</option>
                                    <option value="targetInstance">Target Instance</option>
                                </select>
                            </td>
                            <td><label><input type="checkbox" value="deleteAll" defaultChecked={getDeleteData} onChange={event => setDeleteData(event.target.checked)}/>Delete all data for instance selected</label></td>
                            <td><label><input type="checkbox" value="runAll" defaultChecked={getRunAll} onChange={event => setRunAll(event.target.checked)}/>Run all endpoints</label></td>
                        </tr>
                    </table>
                </div>
            )

        } else if(getSelectedOption === "migration") {
            // Complete Migration Selected
            console.log("Process Selected - >", getSelectedOption)
            return  (
                <div onChange={handleInputChange}>
                    <table align="center" cellPadding="5" cellSpacing="1" border="5px" width="99.3%">
                        <tr>
                            <td>
                                <select name="instance" id="instance" defaultValue={getSelectedInstance} onChange={event => setSelectedInstances(event.target.value)}>
                                    <option value="all">Run all instances</option>
                                    <option value="teams">Teams</option>
                                    <option value="teamsHierarchy">Teams Hierarchy</option>
                                    <option value="users">Users</option>
                                    <option value="schedules">Schedules</option>
                                    <option value="escalationPolicies">Escalation Policies</option>
                                    <option value="services">Services</option>
                                    <option value="businessServices">Business Services</option>
                                    <option value="responsePlays">Response Plays</option>
                                    <option value="webhooks">Webhooks Subscriptions</option>
                                    <option value="tags">Tags</option>
                                    <option value="rulesets">Rulesets</option>
                                    <option value="addons">AddOns</option>
                                    <option value="extensions">Extensions</option>
                                    <option value="bsSubscribers">Business Services Subscribers</option>
                                    <option value="maintenanceWindows">Maintenance Windows</option>
                                </select>
                            </td>
                            <td>
                                <select name="thread" id="thread" defaultValue={getThreat} onChange={event => setThreat(event.target.value)}>
                                    <option value="thread_1">Thread = 1</option>
                                    <option value="thread_2">Thread = 2</option>
                                    <option value="thread_3">Thread = 3</option>
                                    <option value="thread_4">Thread = 4</option>
                                    <option value="thread_5">Thread = 5</option>
                                </select>
                            </td>
                            <td><label><input ref={testModeChecked} type="checkbox" value="testMode" defaultChecked={getTestMode}  onChange={event => setTestMode(event.target.checked)}/>Test Mode</label></td>
                            <td><label><input type="checkbox" value="updateUser" defaultChecked={getUpdateUser}  onChange={event => setUpdateUser(event.target.checked)}/>Update Users</label></td>
                            <td><label><input type="checkbox" value="detectCollision" defaultChecked={getDetectCollision} onChange={event => setDetectCollision(event.target.checked)}/>Detect Collision</label></td>
                            <td><label><input type="checkbox" value="repopulate" defaultChecked={getRepopulateAWS}  onChange={event => setRepopulateAWS(event.target.checked)}/>Repopulate AWS Neptune with target data</label></td>
                        </tr>
                    </table>
                </div>
            )

        } else if(getSelectedOption === "teamMigration") {
            // Team-Based Migration Selected
            console.log("Process Selected - >", getSelectedOption)
            return  (
                <div onChange={handleInputChange}>
                    <table align="center" cellPadding="5" cellSpacing="1" border="5px" width="99.3%">
                        <tr>
                            <td><label><input type="checkbox" value="quickMode" defaultChecked={getQuickMode} onChange={event => setQuickMode(event.target.checked)}/>Quick Mode</label></td>
                            <td>
                                <select name="instance" id="instance" defaultValue={getSelectedInstance} onChange={event => setSelectedInstances(event.target.value)}>
                                    <option value="all">Run all instances</option>
                                    <option value="teams">Teams</option>
                                    <option value="teamsHierarchy">Teams Hierarchy</option>
                                    <option value="users">Users</option>
                                    <option value="schedules">Schedules</option>
                                    <option value="escalationPolicies">Escalation Policies</option>
                                    <option value="services">Services</option>
                                    <option value="businessServices">Business Services</option>
                                    <option value="responsePlays">Response Plays</option>
                                    <option value="webhooks">Webhooks Subscriptions</option>
                                    <option value="tags">Tags</option>
                                    <option value="rulesets">Rulesets</option>
                                    <option value="addons">AddOns</option>
                                    <option value="extensions">Extensions</option>
                                    <option value="bsSubscribers">Business Services Subscribers</option>
                                    <option value="maintenanceWindows">Maintenance Windows</option>
                                </select>
                            </td>
                            <td>
                                <select name="thread" id="thread" defaultValue={getThreat} onChange={event => setThreat(event.target.value)}>
                                    <option value="thread_1">Thread = 1</option>
                                    <option value="thread_2">Thread = 2</option>
                                    <option value="thread_3">Thread = 3</option>
                                    <option value="thread_4">Thread = 4</option>
                                    <option value="thread_5">Thread = 5</option>
                                </select>
                            </td>
                            <td><label><input ref={testModeChecked} type="checkbox" value="testMode" defaultChecked={getTestMode}  onChange={event => setTestMode(event.target.checked)}/>Test Mode</label></td>
                            <td><label><input type="checkbox" value="updateUser" defaultChecked={getUpdateUser}  onChange={event => setUpdateUser(event.target.checked)}/>Update Users</label></td>
                            <td><label><input type="checkbox" value="detectCollision" defaultChecked={getDetectCollision}  onChange={event => setDetectCollision(event.target.checked)}/>Detect Collision</label></td>
                            <td><label><input type="checkbox" value="repopulate" defaultChecked={getRepopulateAWS}  onChange={event => setRepopulateAWS(event.target.checked)}/>Repopulate AWS Neptune with target data</label></td>
                        </tr>
                    </table>
                </div>
            )
        }

    };

    return (
        <div className="wrapper">
            <Title />
            <div>
            <body>
                <form id= "settings" onSubmit={handleSubmit}>
                    <table className="main_table">
                        <tr> {/* Process Type */}
                            <td>
                                <table align="center" cellPadding="5" cellSpacing="1" border="5px" width="100%">
                                    <tr>
                                        <div>
                                            <td width="33%"><input type="radio" value="population" id="processType" name="processType" onChange={event => setSelectedOption(event.target.value)}/>Populate GraphDB</td>
                                            <td width="34%"><input type="radio" value="migration" id="processType" name="processType" onChange={event => setSelectedOption(event.target.value)}/>Complete Migration</td>
                                            <td width="33%"><input type="radio" value="teamMigration" id="processType" name="processType" onChange={event => setSelectedOption(event.target.value)}/>Team-Based Migration</td>
                                            <td> </td>
                                        </div>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <br/>
                        <tr> {/* Execution available options */}
                            {renderOptions()}
                        </tr>
                        <br/>
                        <tr> {/* Main table: Row 3 */}
                            <td>
                                <table align="center" cellPadding="5" cellSpacing="1" border="5px" width="100%">
                                    <tr>
                                        <td width="40%"><input ref={textSourceName} placeholder='Source Instance Name'  defaultValue={getSettings.sourceName} name="sourceName" disabled={true} onChange={event => setSourceName(event.target.value)}/></td>
                                        <td width="40%"><input ref={textTargetName} placeholder='Target Instance Name'  defaultValue={getSettings.targetName} name="targetName" disabled={true} onChange={event => setTargetName(event.target.value)}/></td>
                                        <td width="20%"><button_green type="submit" id="readSettings" onClick={readSettings}>Read Current Settings File</button_green></td><td width="40%"> </td>
                                    </tr>
                                    <tr>
                                        <td width="40%"><input ref={textSourceApiKey} placeholder='Source API Key' required={true}  defaultValue={getSettings.sourceApiKey} name="sourceApiKey" onChange={event => setSourceApiKey(event.target.value)}/></td>
                                        <td width="40%"><input ref={textTargetApiKey} placeholder='Target API Key' defaultValue={getSettings.targetApiKey} name="targetApiKey" onChange={event => setTargetApiKey(event.target.value)}/></td>
                                        <td width="20%"><button_green type="submit" id="updateSettings" onClick={updateSettings}>Update Settings File</button_green></td>
                                    </tr>
                                    <tr>
                                        <td width="40%"><input ref={textSourceEmail} placeholder='Source Email'  defaultValue={getSettings.sourceEmail} name="sourceEmail" onChange={event => setSourceEmail(event.target.value)}/></td>
                                        <td width="40%"><input ref={textTargetEmail} placeholder='Target Email'  defaultValue={getSettings.targetEmail} name="targetEmail" onChange={event => setTargetEmail(event.target.value)}/></td>
                                        <td width="20%"><button_green type="submit" id="createMigrationScript" onClick={genMigrationScript}>Generate Migration Script</button_green></td>
                                    </tr>
                                    <tr >
                                        <td width="40%"><input ref={textSourceUrl} placeholder='Source URL Endpoint'  defaultValue={getSettings.sourceUrl} name="sourceUrl" onChange={event => setSourceUrl(event.target.value)}/></td>
                                        <td width="40%"><input ref={textTargetUrl} placeholder='Target URL Endpoint'  defaultValue={getSettings.targetUrl} name="targetUrl" onChange={event => setTargetUrl(event.target.value)}/></td>
                                        <td width="20%"><button_green type="submit" id="startMigration" onClick={setOnClick}>Start Migration</button_green></td>
                                    </tr>
                                    <tr>
                                        <td width="40%"> </td>
                                        <td width="20%"> </td>
                                        <td width="20%"><button_green type="submit" id="stopMigration" onClick={setOnClick}>Stop Migration</button_green></td>
                                    </tr>
                                    <tr>
                                        <td width="40%"> </td>
                                        <td width="20%"> </td>
                                        <td width="20%"><button_green type="submit" id="viewReports" onClick={setOnClick} >View Migration Reports</button_green></td>
                                    </tr>
                                    <tr>
                                        <td width="40%"> </td>
                                        <td width="20%"> </td>
                                        <td width="20%"><button_green type="submit" id="viewLogs" onClick={setOnClick} >View Migration Logs</button_green></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </form>
            </body>
            </div>
        </div>
    );
}