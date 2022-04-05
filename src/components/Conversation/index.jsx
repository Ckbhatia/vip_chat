import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ImSpinner4 } from "react-icons/im";
import { getSongResult } from "../../services";
import { StyledButton } from "../Common";
import Message from "../Message";
import {
  StyledActionContainer,
  StyledArtist,
  StyledCard,
  StyledCardContainer,
  StyledCloseButton,
  StyledImageContainer,
  StyledInformationContainer,
  StyledInput,
  StyledLinkUrl,
  StyledMessageListContainer,
  StyledMessagesContainer,
  StyledOverlayContainer,
  StyledTitle,
} from "./Styles";
import { StyledSpinnerContainer } from "../Common";
import { STATUS } from "../../constants";

const Converstation = ({ activeConversation, currentUser }) => {
  const [messages, setMessages] = React.useState([]);
  const [messageText, setMessageText] = React.useState("");
  const [songResultStatus, setSongResultStatus] = React.useState(STATUS.IDLE);
  const [songResult, setSongResult] = React.useState(null);

  React.useEffect(() => {
    activeConversation.getMessages().then((newMessages) => {
      setMessages([...messages, ...newMessages.items]);
    });

    activeConversation.on("messageAdded", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    // eslint-disable-next-line
  }, [activeConversation]);

  const handleChange = async (event) => {
    const value = event?.target?.value;
    setMessageText(value);
    if (/\/listen/i.test(value)) {
      setSongResultStatus(STATUS.PENDING);
      const result = value.match(/[a-z ]/gi).join("");
      const query = result.slice(7);
      const searchQuery = query.replaceAll(" ", "+");
      if (searchQuery?.length > 1) {
        const res = await getSongResult(searchQuery);
        setSongResult(res);
        setSongResultStatus(STATUS.RESOLVED);
      }
    }
  };

  const handleSubmit = async () => {
    await activeConversation.sendMessage(messageText);
    setMessageText("");
  };

  const handleSendSong = () => {
    const trackViewUrl = songResult?.trackViewUrl || "";

    if (trackViewUrl) {
      activeConversation.sendMessage(trackViewUrl);
      setSongResultStatus(STATUS.IDLE);
      setMessageText("");
      setSongResult(null);
    }
  };

  const handleClearResult = (e) => {
    e?.preventDefault();
    setSongResult(null);
    setMessageText("");
    setSongResultStatus(STATUS.IDLE);
  };

  const artworkUrl60 = songResult?.artworkUrl60 || "-";
  const trackName = songResult?.trackName || "-";
  const artistName = songResult?.artistName || "-";
  const trackViewUrl = songResult?.trackViewUrl || "-";

  return (
    <>
      <StyledMessagesContainer>
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
        {songResultStatus === STATUS.PENDING ||
        songResultStatus === STATUS.RESOLVED ? (
          <StyledOverlayContainer>
            <StyledCardContainer onClick={handleSendSong}>
              {songResultStatus === STATUS.PENDING ? (
                <StyledSpinnerContainer>
                  <ImSpinner4 />
                </StyledSpinnerContainer>
              ) : (
                <>
                  <StyledCloseButton title="cancel" onClick={handleClearResult}>
                    <AiOutlineCloseCircle />
                  </StyledCloseButton>
                  <StyledCard title="Send">
                    <StyledImageContainer>
                      <img src={artworkUrl60} alt="artwork" />
                    </StyledImageContainer>
                    <StyledInformationContainer>
                      <StyledTitle>{trackName}</StyledTitle>
                      <StyledArtist>{artistName}</StyledArtist>
                      <StyledLinkUrl>{trackViewUrl}</StyledLinkUrl>
                    </StyledInformationContainer>
                  </StyledCard>
                </>
              )}
            </StyledCardContainer>
          </StyledOverlayContainer>
        ) : null}
      </StyledMessagesContainer>
      <StyledActionContainer>
        <StyledInput
          onKeyUp={(e) => {
            if (e.key === "Enter") {
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
