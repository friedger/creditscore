/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import React from 'react';
import {
  Flex, Box, Button,
} from 'rebass';
import PropTypes from 'prop-types';
import { User, getConfig } from 'radiks';

import Text from '../styled/typography';
import Message from '../models/Message';
import Person from '../models/Person';

import Feed from '../components/feed';
import Menu from '../components/menu';

class Home extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  state = {
    currentUser: null,
    messages: [],
  }

  static async getInitialProps() {
    return {
    };
  }



  async componentDidMount() {
    const { userSession } = getConfig();
    if (userSession.isUserSignedIn()) {
      const currentUser = userSession.loadUserData();
      this.setState({ currentUser });

      const messages = await Message.fetchList({
        sort: '-createdAt',
        limit: 10,
      }, { decrypt: true });
      console.log({messages})
      this.setState({messages})
    } else if (userSession.isSignInPending()) {
      const currentUser = await userSession.handlePendingSignIn();
      await User.createWithCurrentUser();
      this.setState({ currentUser });
    }
  }

  login = () => {
    const { userSession } = getConfig();
    userSession.redirectToSignIn();
  }

  logout = () => {
    const { userSession } = getConfig();
    userSession.signUserOut();
    this.setState({
      currentUser: null,
    });
  }

  render() {
    const { currentUser, messages } = this.state;
    console.log({messages})
    return (
      <>
        <Flex>
          <Box width={[1, 3 / 4]} mx="auto">
            <Text.h1 textAlign="center">Creddit Score</Text.h1>
            {currentUser ? (
              <>
                <Text.small textAlign="center" display="block">Logged in as
{' '}
                  {currentUser.username}
                  {'. '}
                  <a onClick={this.logout}>Log Out</a>
                </Text.small>
                <Feed messages={messages} />
                <Menu />
              </>
            ) : (
              <>
                <Text.p textAlign="center">Log in with Blockstack to get started.
</Text.p>

                <Button mt={3} onClick={this.login} mx="auto" style={{ display: 'block' }}>Log In
</Button>
              </>
            )}
          </Box>
        </Flex>
      </>
    );
  }
}

export default Home;
