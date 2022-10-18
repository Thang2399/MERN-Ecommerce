import axios from 'axios';

const endpoint = process.env.REACT_APP_SERVER_END_POINT;

const getListItems = async () => {
    const response = await axios.get(`${endpoint}/items`);
    return response;
};

const getSingleItem = async (id: string) => {
    const response = await axios.get(`${endpoint}/items/${id}`);
    return response;
};

const home = { getListItems, getSingleItem };

export default home;