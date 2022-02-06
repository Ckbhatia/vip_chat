import React from "react";
import { StyledButton } from "../Common";
import Message from "../Message";
import {
  StyledActionContainer,
  StyledInput,
  StyledMessageListContainer,
} from "./Styles";

const Converstation = ({ activeConversation, currentUser }) => {
  const [messages, setMessages] = React.useState([]);
  const [messageText, setMessageText] = React.useState("");

  React.useEffect(() => {
    activeConversation.getMessages().then((newMessages) => {
      setMessages([...messages, ...newMessages.items]);
    });

    activeConversation.on("messageAdded", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    // eslint-disable-next-line
  }, [activeConversation]);

  const handleChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleSubmit = async () => {
    await activeConversation.sendMessage(messageText);
    setMessageText("");
  };

  return (
    <>
      <div>
        <StyledMessageListContainer>
          {messages.map((message, idx) => {
            const text = message?.state?.body;
            return (
              <Message
                key={idx.toString()}
                text={text}
                message={message}
                currentUser={currentUser}
              />
              );
            })}
        </StyledMessageListContainer>
      </div>
      <StyledActionContainer>
        <StyledInput
          onKeyUp={(e) => {
            if(e.key === 'Enter') {
              handleSubmit();
            }
          }}
          onChange={handleChange}
          value={messageText}
          placeholder="Enter your message"
        />
        <StyledButton onClick={handleSubmit}>Send</StyledButton>
      </StyledActionContainer>
    </>
  );
};

export default Converstation;
