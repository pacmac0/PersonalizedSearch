import styled from "styled-components";

export const HistoryWrapper = styled.div`
    position: fixed;
    top:170px;
    left:50px;
    width: 20%;
    height: 60%;
    overflow: scroll;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.2s;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

export const SingleHistoryWrapper = styled.div`
    font-family: Georgia;
    font-size: 18px;
    text-align: justify;
    text-justify: inter-word;
    padding: 5px 3px 5px 10px;
`;

export const HistoryOwner = styled.div`
    padding-top: 10px;
    font-family: Georgia;
    font-size: 20px;
    padding-bottom: 20px;
`;