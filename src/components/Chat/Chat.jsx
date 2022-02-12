import React from "react";
import { Client } from "@twilio/conversations";
import { STATE } from "../../constants/twilio";
import { getAccessToken } from "../../services";
// Styles
import { StyledButton, StyledInput, StyledChatContainer } from "./Styles";
import { StyledContainer } from "../Common";

// Component
import Conversation from "../Conversation";

const Chat = () => {
  const [identity, setIdentity] = React.useState("");
  const [activeConversation, setActiveConversation] = React.useState(null);
  const [status, setStatus] = React.useState("");
  // const [isConnected, setIsConnected] = React.useState(false);
  const [nameRegistered, setNameRegistered] = React.useState(false);

  /**
   * Initialize the chat client
   */
  const initConversationsClient = async () => {
    const token = await getAccessToken(identity);

    Client = await Client.create(token);

    setStatus("Connecting to Twilio...");

    Client.on("connectionStateChanged", (state) => {
      switch (state) {
        case STATE.CONNECTED:
          setStatus("You are connected.");
          // setIsConnected(true);
          break;
        case STATE.DISCONNECTING:
          setStatus("Disconnecting from Twilio...");
          break;
        case STATE.DISCONNECTED:
          setStatus("Failed to connect.");
          break;
        default: {
          setStatus("Twilio?");
        }
      }
    });
  };

  const createConversation = async () => {
    // Ensure User1 and User2 have an open client session
    // TODO: user should be dynamicaly generated instead of static
    try {
      await Client.getUser("User1");
      await Client.getUser("User2");
    } catch {
      return;
    }
    // Try to create a new conversation and add User1 and User2
    // If it already exists, join instead
    try {
      const newConversation = await Client.createConversation({
        uniqueName: "chat",
      });
      const joinedConversation = await newConversation
        .join()
        .catch((err) => console.log(err));
      await joinedConversation
        .add("User1")
        .catch((err) => console.log("error: ", err));
      await joinedConversation
        .add("User2")
        .catch((err) => console.log("error: ", err));
      setActiveConversation(joinedConversation);
    } catch {
      const res = await Client.getConversationByUniqueName("chat");
      setActiveConversation(res);
    }
  };

  const register = async () => {
    if (!identity) {
      throw Error("Please enter a name");
    }
    setNameRegistered(true);
    initConversationsClient();
  };

  const handleChange = (e) => {
    setIdentity(e.target.value);
  };

  if (!nameRegistered) {
    return (
      <main>
        <StyledContainer>
          <StyledChatContainer>
            <StyledInput
              type="text"
              value={identity}
              onChange={handleChange}
              placeholder="Enter your name"
              />
            <StyledButton onClick={register}>Submit</StyledButton>
          </StyledChatContainer>
        </StyledContainer>
      </main>
    );
  } else if (nameRegistered && !activeConversation) {
    return (
      <main>
        <StyledContainer>
          <StyledChatContainer>
            <span>{status}</span>
            <StyledButton onClick={createConversation}>Join chat</StyledButton>
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
