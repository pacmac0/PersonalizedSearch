import styled from 'styled-components';

export const HomeContent = styled.div`
    margin: auto;
    width: 600px;
    height: 400px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const Logo = styled.div`
    font-family: cursive;
    font-size: 40px;
    text-align: center;
    font-weight: bold;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

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
        width: 440px;
    }
    &.slide-enter {
        width: 320px;
    }
    &.slide-enter-active {
        width: 440px;
    }
    &.slide-exit {
        transition: all .8s ease-out;
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