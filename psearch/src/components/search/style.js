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
    &::placeholder {
        color: #999;
    }
    &.focused {
        width: 400px;
    }
    &.slide-enter {
        width: 320px;
    }
    &.slide-enter-active {
        width: 400px;
    }
    &.slide-exit {
        width: 400px;
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
      background: #777;
      color:#fff;
    }
  }
`;