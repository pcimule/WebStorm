import axios from "axios";

export default axios.create({
    baseURL: "http://ec2-3-135-183-93.us-east-2.compute.amazonaws.com:5000/csg-portal/migrationv2/",
    headers: {
        "Content-type": "application/json"
    }
});