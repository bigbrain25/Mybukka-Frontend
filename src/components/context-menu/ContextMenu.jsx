/* eslint-disable no-underscore-dangle */
import React, { createRef } from 'react';

import './context-menu.scss';

/**
 * @class ContextMenu
 */
class ContextMenu extends React.Component {
  /**
   * @constructor ContextMenu
   */
  constructor() {
    super();
    this.root = createRef();

    this.state = {
      visible: false,
    };
  }

  /**
   * @method componentDidMount
   * @memberof ContextMenu
   * @returns {viod} viod
   */
  componentDidMount() {
    document.addEventListener('contextmenu', this._handleContextMenu);
    document.addEventListener('click', this._handleClick);
    document.addEventListener('scroll', this._handleScroll);
  }

  /**
   * @method componentWillUnmount
   * @memberof ContextMenu
   * @returns {viod} viod
   */
  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);
    document.removeEventListener('click', this._handleClick);
    document.removeEventListener('scroll', this._handleScroll);
  }


  /**
   * @method _handleContextMenu
   * @param {*} event
   * @memberof ContextMenu
   * @returns {viod} viod
   */
  _handleContextMenu = (event) => {
    event.preventDefault();

    this.setState({ visible: true });

    const clickX = event.clientX;
    const clickY = event.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const rootW = this.root.offsetWidth;
    const rootH = this.root.offsetHeight;

    const right = (screenW - clickX) > rootW;
    const left = !right;
    const top = (screenH - clickY) > rootH;
    const bottom = !top;

    if (right) {
      this.root.style.left = `${clickX + 5}px`;
    }

    if (left) {
      this.root.style.left = `${clickX - rootW - 5}px`;
    }

    if (top) {
      this.root.style.top = `${clickY + 5}px`;
    }

    if (bottom) {
      this.root.style.top = `${clickY - rootH - 5}px`;
    }
  };

  /**
   * @method _handleClick
   * @param {*} event
   * @memberof ContextMenu
   * @returns {viod} viod
   */
  _handleClick = (event) => {
    const { visible } = this.state;
    const wasOutside = !(event.target.contains === this.root);

    if (wasOutside && visible) this.setState({ visible: false, });
  };

  /**
   * @method _handleScroll
   * @memberof ContextMenu
   * @returns {viod} viod
   */
  _handleScroll = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false, });
  };

  /**
   * @method render
   * @memberof ContextMenu
   * @returns {viod} viod
   */
  render() {
    const { visible } = this.state;

    return (visible || null) &&
      <div ref={this.root} className="contextMenu">
        <div className="contextMenu--option">Share this</div>
        <div className="contextMenu--option">New window</div>
        <div className="contextMenu--option">Visit official site</div>
        <div className="contextMenu--option contextMenu--option__disabled">View full version</div>
        <div className="contextMenu--option">Settings</div>
        <div className="contextMenu--separator" />
        <div className="contextMenu--option">About this app</div>
      </div>;
  }
}
export default ContextMenu;
