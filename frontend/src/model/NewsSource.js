import axios from 'axios';
const NewsSource = {
    async getSearchedResults(params) {
        const query = {
            query: {
                bool: {
                    should: [
                        { match: { "abstract" : params}},
                        { match: { "title" : params}},
                        { match: { "category" : params}},
                        { match: { "sub_category" : params}},
                        { match: { "body" : params}}
                    ]
                }
            }
        };
        return axios.get("http://localhost:9200/news/_search?", {
            params: {
                source: JSON.stringify(query),
                source_content_type: 'application/json'
            }
        }).then((res)=> {
            console.log(res.data.hits.hits);
            return res.data.hits.hits;
        })
    }
}

export default NewsSource;