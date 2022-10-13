import axios from "axios";

    const endpoint = process.env.REACT_APP_SERVER_END_POINT;


const getListItems = async () => {
    const response =  axios.get(`${endpoint}/items`);
    return response;
};

const home = {getListItems}

export default home;