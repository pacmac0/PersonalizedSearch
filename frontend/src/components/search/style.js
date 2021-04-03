import styled from 'styled-components'; 

export const SearchBox = styled.input.attrs({
    placeholder: 'Search'
})`
    width: 320px;
    height: 40px;
    padding: 0 30px 0 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 25px;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 15px;
    background: #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    :hover{
      box-shadow: 0 5px 12px rgba(0, 0, 0, .2);
    }
    &::placeholder {
        color: #999;
    }
    &.focused {
        width: 440px;
    }
    &.slide-enter {
        width: 320px;
        transition: all .2s ease-in;
    }
    &.slide-enter-active {
        width: 440px;
    }
    &.slide-exit {
        width: 440px;
        transition: all .2s ease-out;
    }
    &.slide-exit-active {
        width: 320px;
    }
    
`;

export const SearchWrapper = styled.div`
    position: relative;
    .zoom {
    position: absolute;
    right: 105px;
    top: 34px;
    width: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    &.focused {
      background: #666666;
      color:#fff;
    }
  }

`;

export const ResultsWrapper = styled.div`
    position: relative;
    text-align: left;
`;

export const ResultWrapper = styled.div`
    margin-bottom: 20px;
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