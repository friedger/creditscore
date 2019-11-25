import React from "react";
import { Box, Button } from "rebass";

const Menu = () => {
  const createAssociation = () => {

  }

  const inviteMFB = () => {

  }

  const inviteBranch = () => {

  }

  const inviteAgent = () => {

  }

  return (
    <Box>
      <Button onClick={() => createAssociation()} mt={2}>
        Create new MFB Association
      </Button>
      <Button onClick={() => inviteMFB()} mt={2}>
        Invite MFB
      </Button>
      <Button onClick={() => inviteBranch()} mt={2}>
        Invite Branch
      </Button>
      <Button onClick={() => inviteAgent()} mt={2}>
        Invite Agent
      </Button>
    </Box>
  );
};

export default Menu;
