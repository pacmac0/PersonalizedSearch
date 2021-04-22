import { 
    NewsBlockWrapper,
    CiteWrapper, 
    NewsUrl,
    NewsTitle,
    NewsAbstract
} from "./style";

function NewsBlock(props) {
    const {
        id,
        url,
        title,
        category,
        sub_category,
        abstract,
        onClickNews
    } = props;

    return (
        <NewsBlockWrapper key={id}>
            <CiteWrapper>
                <NewsUrl>{url} {'>'} {category} {'>'} {sub_category} </NewsUrl>
            </CiteWrapper>
            <NewsTitle
                onClick={onClickNews}
            >
                {title}
            </NewsTitle>
            <NewsAbstract>{abstract}</NewsAbstract>
        </NewsBlockWrapper>
    );
}

export default NewsBlock;