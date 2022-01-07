import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { markMessagesAsRead } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  unreadCount: {
    backgroundColor: '#3f92ff',
    borderRadius: '100%',
    width: 20,
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation} = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    const reqBody = {
      conversationId: conversation.id,
      otherUser
    };
    await props.markMessagesAsRead(reqBody);
    await props.setActiveChat(conversation.otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      <Box className={classes.unreadCount}>{conversation.unreadMessageCount > 0 && conversation.unreadMessageCount}</Box>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    markMessagesAsRead: (conversation) => {
      dispatch(markMessagesAsRead(conversation))
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
