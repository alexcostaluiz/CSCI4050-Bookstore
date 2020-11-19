const Colors = {
  colors: [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ],
  category: (cat) => Colors.colors[cat.charCodeAt(0) % 11],
};

export default Colors;
