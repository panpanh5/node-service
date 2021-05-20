import axios from 'axios';
export const citys = {
    city: async () => {
        return await axios.get('https://shadow.elemecdn.com/lib/city-list@0.0.3/city_list.json')
    }
}