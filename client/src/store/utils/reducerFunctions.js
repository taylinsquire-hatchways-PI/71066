export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    if (message.senderId === newConvo.otherUser.id) {
      newConvo.unreadMessageCount = 1;
    }
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convo.messages, message];
      convoCopy.latestMessageText = message.text;
      if (message.senderId === convo.otherUser.id) {
        convoCopy.unreadMessageCount += 1;
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages = [...convo.messages, message];
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const markConvoAsRead = (state, payload) => {
  const { conversationId, otherUser } = payload;
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      if (otherUser) {
        const lastReadIndex = convo.messages.findIndex((message) => message.id === convoCopy.lastRead);
        const newMessages = convo.messages.slice(lastReadIndex);
        for (let i = 0; i < newMessages.length; i++) {
          if (newMessages[i].senderId === otherUser.id) {
            convoCopy.lastReadId = newMessages[i].id;
          }
        }
        return convoCopy;
      }
      convoCopy.unreadMessageCount = 0;
      return convoCopy;
    } else {
      return convo;
    }
  })
}