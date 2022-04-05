import tw, { styled, css } from "twin.macro";

export const StyledMessagesContainer = styled.div`
  position: relative;
`;

export const StyledMessageListContainer = styled.ul`
  height: 92vh;
  ${tw`
    flex flex-col
    list-none
    border-2 border-gray-200
    overflow-y-scroll
    px-3
  `}
`;

export const StyledOverlayContainer = styled.div`
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 98%;
  margin-left: 3px;
  margin-bottom: 3px;
`;

export const StyledCardContainer = styled.div`
  position: relative;
  padding: 2px;
  box-shadow: -1px -1px 4px 1px #f4f4f4;
  cursor: pointer;
`;

export const StyledCloseButton = styled.button`
  background-color: #ffffff;
  position: absolute;
  right: 5px;
  top: 5px;

  svg {
    color: #656464;
  }

  &:hover {
    svg {
      color: #2e2e2e;
    }
  }
`;

export const StyledCard = styled.div`
  ${tw`flex flex-row`}
  column-gap: 5px;
`;

export const StyledImageContainer = styled.div`
  width: 20%;

  img {
    height: 100%;
  }
`;

export const StyledInformationContainer = styled.div`
  width: 80%;
  ${tw`
  flex flex-col items-start
`}
`;

const limitText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
`;

export const StyledTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  ${limitText};
`;

export const StyledArtist = styled.span`
  font-size: 10px;
  ${limitText};
`;

export const StyledLinkUrl = styled.span`
  font-size: 10px;
  ${limitText};
`;

export const StyledActionContainer = tw.div`
  flex flex-row
  mt-2
`;

export const StyledInput = tw.input`
  placeholder-gray-500
  px-4 py-2 
  w-full
  border-2 border-gray-200 rounded-md
`;