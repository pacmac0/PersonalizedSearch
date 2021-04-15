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
    left: 33%;
    width: 500px;
    .zoom {
        position: absolute;
        top: 43px;
        right: 50px;
        width: 30px;
        text-align: center;
        line-height: 30px;
        color: #000;
        &.focused {
            color:#7f7f7f;
        }
    }
`;