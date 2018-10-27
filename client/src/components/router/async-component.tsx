import React from 'react';

interface DynamicComponentInterface {
  [key: string]: React.ComponentClass<{}, {}> | React.SFC<{}>;
}

interface ComponentState {
  Component: null | React.ComponentClass<{}, {}> | React.SFC<{}>;
}

export const AsyncComponent = (
  loader: () => Promise<DynamicComponentInterface>,
  componentName: string,
) =>
  class AsyncComp extends React.Component<{}, ComponentState> {
    constuctor() {
      this.state = {
        Component: null,
      };
    }

    public async componentDidMount() {
      const ComponentItem = await loader();
      this.setState({ Component: ComponentItem[componentName] });
    }

    public render() {
      const Component = this.state && this.state.Component;
      return Component ? <Component {...this.props} /> : null;
    }
  };
