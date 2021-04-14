import {
    ResultWrapper,
    CiteWrapper,
    NewsTitle,
    NewsAbstract,
    NewsUrl,
    ResultsWrapper,
} from './style';

function SearchResultView(props) {

    const { data } = props;

    return (
        <div className="SearchResultView">
            <ResultsWrapper>
            {
                data.length !==0 ? 
                <div>
                    {data.map((elem,index) => {
                        return (
                            <ResultWrapper key={index}>
                                <CiteWrapper>
                                    <NewsUrl>{elem._source.url} {'>'} {elem._source.category} {'>'} {elem._source.sub_category}</NewsUrl>
                                </CiteWrapper>
                                
                                <NewsTitle><a href={elem._source.url}> {elem._source.title}</a></NewsTitle>
                                <NewsAbstract>{elem._source.abstract}</NewsAbstract>
                            </ResultWrapper>
                        )
                    })}
                </div>
            : ""}
            </ResultsWrapper>
        </div>
    );

}

export default SearchResultView;