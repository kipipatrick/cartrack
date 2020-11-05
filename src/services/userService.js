import axios from "axios";


const GET_USERS_API ="https://jsonplaceholder.typicode.com/users"

const getAll = async () => {
  return await axios.get(`${GET_USERS_API}`);
};
const search = async (term, key) => {
    console.log(term, key)
    return await axios.get(`${GET_USERS_API}?${key.toLowerCase()}=${term}`);
  };



export default { getAll, search };

