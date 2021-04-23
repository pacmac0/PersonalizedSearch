import { NewsBlockPresenter } from "../../presenters";
import {
    ResultsWrapper,
} from './style';

function SearchResultView(props) {

    const { 
        data,
        model 
    } = props;

    return (
        <div className="SearchResultView">
            <ResultsWrapper>
            {
                data.length !==0 ? 
                <div>
                    {data.map((elem,index) => {
                        return (
                            <NewsBlockPresenter 
                                key={index}
                                id={elem._id}
                                url={elem._source.url}
                                title={elem._source.title}
                                category={elem._source.category}
                                sub_category={elem._source.sub_category}
                                abstract={elem._source.abstract}
                                model = {model}       
                            />
                        )
                    })}
                </div>
            : ""}
            </ResultsWrapper>
        </div>
    );

}

export default SearchResultView;