import {
    HistoryWrapper,
    SingleHistoryWrapper,
    HistoryOwner
} from "./style";
function History(props) {
    const { currentUser, data } = props;
    return (
        <div className="History">
            { 
                data.length !==0 ?
                <HistoryWrapper>
                    <HistoryOwner>
                        {currentUser}'s History
                    </HistoryOwner>
                    {data.map((history,index)=>(
                        <SingleHistoryWrapper key={index}>
                            {index+1}. {history._source.title}
                        </SingleHistoryWrapper>
                    )
                    )}
                </HistoryWrapper>
            :""}
        </div>
    )
}

export default History;