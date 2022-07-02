import React, { Component, useRef } from "react";
import PollList from "../../poll/PollList";
import { getUserProfile } from "../../util/APIUtils";
import { Avatar, Tabs } from "antd";
import { getAvatarColor } from "../../util/Colors";
import { formatDate } from "../../util/Helpers";
import LoadingIndicator from "../../common/LoadingIndicator";
import "./Profile.css";
import NotFound from "../../common/NotFound";
import ServerError from "../../common/ServerError";
import PdfGenerator from "./PdfGenerator";
import AllCharts from "../../graphs/AllCharts";
//import ComponentToPrint from '../../poll/ComponentToPrint';

//import { Bar } from 'react-chartjs-2';
//import Chart from '../../graphs/Chart';
//import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useReactToPrint } from "react-to-print";
// const componentRef = useRef();
// const handlePrint = useReactToPrint({
//       content: () => componentRef.current, });
// import { Bar } from "react-chartjs-2";

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};
const TabPane = Tabs.TabPane;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: false,
    };
    this.loadUserProfile = this.loadUserProfile.bind(this);
  }

  loadUserProfile(username) {
    this.setState({
      isLoading: true,
    });

    getUserProfile(username)
      .then((response) => {
        this.setState({
          user: response,
          isLoading: false,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false,
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false,
          });
        }
      });
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    this.loadUserProfile(username);
  }

  componentDidUpdate(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.loadUserProfile(nextProps.match.params.username);
    }
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    if (this.state.notFound) {
      return <NotFound />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }

    const tabBarStyle = {
      textAlign: "center",
    };
    // const styles = StyleSheet.create({
    //     page: {
    //       flexDirection: 'row',
    //       backgroundColor: '#E4E4E4'
    //     },
    //     section: {
    //       margin: 10,
    //       padding: 10,
    //       flexGrow: 1
    //     }
    //   });
    // const MyDocument = () => (
    //     <Document>
    //       <Page size="A4" style={styles.page}>
    //         <View style={styles.section}>
    //           <Text>Section #1</Text>
    //         </View>
    //         <View style={styles.section}>
    //           <Text>Section #2</Text>
    //         </View>
    //       </Page>
    //     </Document>
    //   );
    //   const Example = () => {
    //     const componentRef = useRef();
    //     const handlePrint = useReactToPrint({
    //       content: () => componentRef.current,
    //     });

    return (
      <div className="profile">
        {this.state.user ? (
          <div className="user-profile">
            <div className="user-details">
              <div className="user-avatar">
                <Avatar
                  className="user-avatar-circle"
                  style={{
                    backgroundColor: getAvatarColor(this.state.user.name),
                  }}
                >
                  {this.state.user.name[0].toUpperCase()}
                </Avatar>
              </div>
              <div className="user-summary">
                <div className="full-name">{this.state.user.name}</div>
                <div className="username">@{this.state.user.username}</div>
                <div className="user-joined">
                  Joined {formatDate(this.state.user.joinedAt)}
                </div>
              </div>
            </div>
            <div className="user-poll-details">
              <Tabs
                defaultActiveKey="1"
                animated={false}
                tabBarStyle={tabBarStyle}
                size="large"
                className="profile-tabs"
              >
                <TabPane tab={`${this.state.user.pollCount} Polls`} key="1">
                  <PollList
                    username={this.props.match.params.username}
                    type="USER_CREATED_POLLS"
                  />
                </TabPane>
                <TabPane
                  tab={`${this.state.user.voteCount} Vote Graph`}
                  key="2"
                >
                  <PollList
                    username={this.props.match.params.username}
                    type="USER_VOTED_POLLS"
                  />
                </TabPane>
                <TabPane tab={`${this.state.user.voteCount}  Graph`} key="3">
                  <AllCharts
                    username={this.props.match.params.username}
                    type="USER_CREATED_POLLS"
                  />

                  <PdfGenerator />
                </TabPane>
              </Tabs>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Profile;
