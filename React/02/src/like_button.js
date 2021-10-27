'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      console.log('you liked this');
      return 'You liked this.';
    }

    // 浏览器原生特性
    // return e(
    //   'button',
    //   { onClick: () => this.setState({ liked: true })},
    //   'Like'
    // );

    // JSX
    return (<button onClick={() => this.setState({ liked: true })}>Like</button>);
  }
}

console.log('like_button.js');
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
