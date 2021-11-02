class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children;
  }
}

// <ErrorBoundary>
//   <MyWidget />
// </ErrorBoundary>

// https://zh-hans.reactjs.org/docs/forwarding-refs.html  Refs 转发
