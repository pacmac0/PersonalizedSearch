import styled from "styled-components";

export const RecommendationWrapper = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    height: 300px;
    padding: 5px 0px 10px 0px;
    overflow-y: scroll;
    border-radius: 1.5em;
    transition: 0.3s;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

export const RecommendationTitleWrapper = styled.div`
    font-family: Georgia;
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
    font-family: Georgia;
    font-size: 16px;
    text-align: justify;
    text-justify: inter-word;
    padding: 2px 20px 10px 20px;
`;