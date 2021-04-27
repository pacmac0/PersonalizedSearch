import axios from 'axios';
const NewsSource = {

    async getSearchedResults(search) {
        return axios.get("http://localhost:8080/api/regularsearch", {
            params: {
                query: search,
            },
        }).then((res)=> {
            return res.data.result.hits.hits
        }).catch((e) => {
            console.log(e)
        })
    },

    async getRecommendation(newsid){
        return axios.get("http://0.0.0.0:8080/api/getrecommendation", {
            params: {
                id: newsid,
            },
        }).then((res)=> {
            return res.data.result.docs
        }).catch((e) => {
            console.log(e)
        })
    },

    async gethistory(userid){
        return axios.get("http://0.0.0.0:8080/api/gethistory", {
            params: {
                id: userid,
            },
        }).then((res)=> {
            return res.data.result.docs
        }).catch((e) => {
            console.log(e)
        })
    },

    async getNewsById(newsid) {
        
        return axios.get("http://localhost:8080/api/getnewsbyid", {
            params: {
                id:newsid
            }
        }).then((res)=> {
            return res.data.result;
        })
    },

    async personalizedSearch(userid, query){
        return axios.get("http://localhost:8080/api/personalizedsearch", {
            params: {
                id: userid,
                query: query,
            },
        }).then((res)=> {
            return res.data.result
        }).catch((e) => {
            console.log(e)
        })
    },

    // Don't have to return anything.. Just check that is worked by looking at the response?
    async updateUser(userid, newsid){
        return axios.get("http://localhost:8080/api/updateuser", {
            params: {
                id: userid,
                click: newsid,
            },
        }).then((res)=> {
            return res
        }).catch((e) => {
            console.log(e)
        })
    }
}

export default NewsSource;