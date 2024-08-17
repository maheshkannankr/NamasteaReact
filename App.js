const heading = [
  React.createElement(
    'div',
    {
      id: 'parent',
    },
    React.createElement(
      'div',
      {
        id: 'child',
      },
      [
        React.createElement(
          'h1',
          {
            id: 'heading',
          },
          'Hello World inside Child'
        ),
        React.createElement(
          'h1',
          {
            id: 'heading',
          },
          'Hello World inside Child'
        ),
      ]
    )
  ),
  React.createElement(
    'div',
    {
      id: 'parent',
    },
    React.createElement(
      'div',
      {
        id: 'child',
      },
      [
        React.createElement(
          'h1',
          {
            id: 'heading',
          },
          'Hello World inside Child'
        ),
        React.createElement(
          'h1',
          {
            id: 'heading',
          },
          'Hello World inside Child'
        ),
      ]
    )
  ),
];

const root = ReactDOM.createRoot(document.getElementById('rootss'));
console.log(root);
root.render(heading);
