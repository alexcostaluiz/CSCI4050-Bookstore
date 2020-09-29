import './Slider.less';

import React from 'react';

/**
 * A horizontal sliding component.
 *
 * @param {number} props.spaceBetween The width (in pixels) of the gap between each
 *     slider item.
 * @param {boolean} props.primary True if this slider should be rendered more prominently;
 *     false otherwise.
 * @param {!Array<ReactNode>} props.children An array of child components that
 *     should be displayed in this slider.
 * @param {string} props.className A class string to be applied to the parent container
 *     of this component.
 * @param {?Object<string, *>} props.style An optional style object to be applied
 *     to the parent container of this component.
 */
function Slider(props) {
  const { spaceBetween, primary } = props;
  let { children, className, style } = props;

  if (!primary) {
    children = children.map((child, index) =>
      React.cloneElement(child, {
        key: index,
        className:
          (child.props.className ? child.props.className : '') +
          ' bookstore-slider-item',
        style: {
          ...child.props.style,
          margin: '0px ' + spaceBetween / 2 + 'px',
        },
      })
    );
  }

  return (
    <div className='bookstore-slider-wrapper'>
      <div
        className={
          (primary ? 'bookstore-slider-primary ' : 'bookstore-slider ') +
          (className ? className : '')
        }
        style={style}>
        {primary && children[0]
          ? [
              React.cloneElement(children[0], {
                key: 'large-slider-item',
                size: 'large',
                style: {
                  ...children[0].props.style,
                  margin: '0px ' + spaceBetween + 'px',
                  flex: '0 0 auto',
                },
              }),
              <div
                key='nested-sliders'
                className='bookstore-slider-nested-container'>
                <Slider spaceBetween={spaceBetween}>
                  {children.slice(1, children.length / 2 + 1)}
                </Slider>
                <Slider spaceBetween={spaceBetween}>
                  {children.slice(children.length / 2 + 1, children.length)}
                </Slider>
              </div>,
            ]
          : children}
      </div>
      {!primary && <div className='bookstore-slider-scrollbar-cover' />}
    </div>
  );
}

export default Slider;
