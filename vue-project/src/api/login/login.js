import axios from "axios";

async function login(params) {
    return await axios.post("/api/login", { data: params })
}
export default login
