import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectChannel, fetchMessages } from '../actions/index';

class ChannelList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedChannel !== this.props.selectedChannel) {
      this.props.fetchMessages(nextProps.selectedChannel);
    }
  }

  handleClick = (channel) => {
    this.props.selectChannel(channel);
  }

  renderChannel() {
    return this.props.channels.map((channel) => {
      return (
        <li
          key={channel}
          className={channel === this.props.selectedChannel ? 'active' : ''}
          onClick={() => this.handleClick(channel)}
          role="presentation"
        >
          #{channel}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="channels-container">
        <span>Redux Chat</span>
        <ul>
          {this.renderChannel()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    selectedChannel: state.selectedChannel
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectChannel, fetchMessages }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
