import styled from 'styled-components';

export const NewsBlockWrapper = styled.div`
    position: relative;
    text-align: left;
`;

export const CiteWrapper = styled.div`
    display: block;
    padding-top: 1px;
    padding-bottom: 2px;
    text-decoration-thickness: auto;
    text-size-adjust: 100%;
`;

export const NewsUrl = styled.cite`
    text-align:left;
    font-size: 14px;
    font-style: normal;
    cursor: pointer;
    display: inline;
    line-height: 18.2px;
    -webkit-tap-highlight-color: rgba(0,0,0,0.1);
`;

export const NewsTitle = styled.h3`
    text-decoration: none;
    color: #1a0dab;
    margin-bottom: 3px;
    margin-top: 5px;
    cursor: pointer;
    :hover{
        font-weight: bold;
        text-decoration: underline;
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
`;

export const NewsAbstract = styled.div`
    font-size: 14px;
`;