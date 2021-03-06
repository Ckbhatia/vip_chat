import React from "react";
import { Client } from "@twilio/conversations";
import { STATE } from "../../constants/twilio";
import { getAccessToken } from "../../services";
import config from "../../config";

// Styles
import { StyledButton, StyledChatContainer, StyledTextContainer } from "./Styles";
import { StyledContainer } from "../Common";

// Component
import Conversation from "../Conversation";


const { userOne, userTwo, uniqueChatName } = config;

const Chat = () => {
  const [identity, setIdentity] = React.useState("");
  const [activeConversation, setActiveConversation] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  const [nameRegistered, setNameRegistered] = React.useState(false);

  /**
   * Initialize the chat client
   */
  const initConversationsClient = async (username) => {
    const token = await getAccessToken(identity || username);

    setStatus("Wait");

    Client = await Client.create(token);

    setStatus("Connecting");

    setIsConnected(true);

    Client.onWithReplay("connectionStateChanged", (state) => {
      switch (state) {
        case STATE.CONNECTED:
          setStatus("Connected.");
          setIsConnected(true);
          break;
        case STATE.DISCONNECTING:
          setStatus("Disconnecting.");
          break;
        case STATE.DISCONNECTED:
          setStatus("Failed to connect.");
          break;
        default: {
          setStatus("Twilio");
        }
      }
    });
  };

  const createConversation = async () => {
    // Ensure User1 and User2 have an open client session
    // TODO: user should be dynamicaly generated instead of static
    try {
      await Client.getUser(userOne);
      await Client.getUser(userTwo);
    } catch {
      return;
    }
    // Try to create a new conversation and add User1 and User2
    // If it already exists, join instead
    try {
      const newConversation = await Client.createConversation({
        uniqueName: uniqueChatName,
      });
      const joinedConversation = await newConversation
        .join()
        .catch((err) => console.log(err));
      await joinedConversation
        .add(userOne)
        .catch((err) => console.log("error: ", err));
      await joinedConversation
        .add(userTwo)
        .catch((err) => console.log("error: ", err));
      setActiveConversation(joinedConversation);
    } catch {
      const res = await Client.getConversationByUniqueName(uniqueChatName);
      setActiveConversation(res);
    }
  };

  const register = async (username) => {
    if (identity || username) {
      setNameRegistered(true);
      initConversationsClient(username);
      if(!identity && username) {
        setIdentity(username);
      }
    }
  };

  if (!nameRegistered) {
    return (
      <main>
        <StyledContainer>
          <StyledTextContainer>
            <span>Login as</span>
            <StyledButton onClick={() => register(config.userOne)}>
              Roger
            </StyledButton>
            <StyledButton onClick={() => register(config.userTwo)}>
              David
            </StyledButton>
          </StyledTextContainer>
        </StyledContainer>
      </main>
    );
  } else if (nameRegistered && !activeConversation) {
    return (
      <main>
        <StyledContainer>
          <StyledChatContainer>
              <span>{status}</span>
            <StyledButton onClick={createConversation} disabled={!isConnected}>Join chat</StyledButton>
          </StyledChatContainer>
        </StyledContainer>
      </main>
    );
  }

  return (
    <main>
      <StyledContainer>
        <Conversation
          activeConversation={activeConversation}
          currentUser={identity}
        />
      </StyledContainer>
    </main>
  );
};
export default Chat;
