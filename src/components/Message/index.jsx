import Unfurl from "../Unfurl";
import { StyledMessageContainer, StyledText } from "./Styles";

const Message = ({ text, message, currentUser }) => {
  const isCurrentUser = message?.state?.author === currentUser;

  const isMusicLink = (text) => {
    return text?.includes("https://music.apple.com");
  };
  return (
    <StyledMessageContainer isCurrentUser={isCurrentUser}>
      {isMusicLink(text) ? <Unfurl url={text} /> : <StyledText>{text}</StyledText>}
    </StyledMessageContainer>
  );
};

export default Message;
