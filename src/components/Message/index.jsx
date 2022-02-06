import { StyledMessageContainer, StyledText } from "./Styles";

const Message = ({text, message, currentUser}) => {
  const isCurrentUser = message?.state?.author === currentUser;
  return (
    <StyledMessageContainer isCurrentUser={isCurrentUser}>
      <StyledText>{text}</StyledText>
    </StyledMessageContainer>
  )
}

export default Message;