import tw, { styled, css } from "twin.macro";

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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

export const StyledLinkUrl = styled.a`
  font-size: 10px;
  ${limitText};
`;
