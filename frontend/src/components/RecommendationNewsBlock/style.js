import styled from "styled-components";

export const RecommendationWrapper = styled.div`
    border: 1px solid #000;
    height: 200px;
    padding: 5px 0px 10px 0px;
    overflow-y: scroll;
`;

export const RecommendationTitleWrapper = styled.div`
    font-size:18px;
    padding: 10px 20px 0px 20px;
    cursor: pointer;
    :hover{
        text-decoration: underline;
        color: #1a0dab;
        text-shadow: 1px #000000;
    }
`;

export const RecommendationAbstractWrapper = styled.div`
    font-size: 14px;
    text-align: justify;
    text-justify: inter-word;
    padding: 2px 20px 10px 20px;
`;