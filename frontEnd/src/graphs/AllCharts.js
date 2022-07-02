import React, { Component } from "react";
import {
  getAllPolls,
  getUserCreatedPolls,
  getUserVotedPolls,
} from "../util/APIUtils";
import { Button, Icon } from "antd";
import LoadingIndicator from "../common/LoadingIndicator";

import Charts from "./Charts";
import { POLL_LIST_SIZE } from "../constants";
import { withRouter } from "react-router-dom";

import "./PollList.css";

class PollList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
      last: true,
      currentVotes: [],
      isLoading: false,
    };
    this.loadPollList = this.loadPollList.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  loadPollList(page = 0, size = POLL_LIST_SIZE) {
    let promise;
    if (this.props.username) {
      if (this.props.type === "USER_CREATED_POLLS") {
        promise = getUserCreatedPolls(this.props.username, page, size);
      } else if (this.props.type === "USER_VOTED_POLLS") {
        promise = getUserVotedPolls(this.props.username, page, size);
      }
    } else {
      promise = getAllPolls(page, size);
    }

    if (!promise) {
      return;
    }

    this.setState({
      isLoading: true,
    });

    promise
      .then((response) => {
        const polls = this.state.polls.slice();
        const currentVotes = this.state.currentVotes.slice();

        this.setState({
          polls: polls.concat(response.content),
          page: response.page,
          size: response.size,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          last: response.last,
          currentVotes: currentVotes.concat(
            Array(response.content.length).fill(null)
          ),
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.loadPollList();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      // Reset State
      this.setState({
        polls: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        last: true,
        currentVotes: [],
        isLoading: false,
      });
      this.loadPollList();
    }
  }

  handleLoadMore() {
    this.loadPollList(this.state.page + 1);
  }

  render() {
    const graphs = [];
    this.state.polls.forEach((poll, pollIndex) => {
      graphs.push(
        <div>
          <Charts key={pollIndex} data={poll} />
        </div>
      );
    });

    return (
      <div className="polls-container">
        {graphs}
        {!this.state.isLoading && this.state.polls.length === 0 ? (
          <div className="no-polls-found">
            <span>No Graphs Found.</span>
          </div>
        ) : null}
        {!this.state.isLoading && !this.state.last ? (
          <div className="load-more-polls">
            <Button
              type="dashed"
              onClick={this.handleLoadMore}
              disabled={this.state.isLoading}
            >
              <Icon type="plus" /> Load more
            </Button>
          </div>
        ) : null}
        {this.state.isLoading ? <LoadingIndicator /> : null}
      </div>
    );
  }
}

export default withRouter(PollList);
