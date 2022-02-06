import tw, { styled } from "twin.macro";

export const StyledMessageContainer = styled.li`
  ${tw`
    rounded-sm
    w-max
    my-2
    p-2
    bg-gray-100
  `};

  ${({ isCurrentUser }) => isCurrentUser && tw`bg-blue-100 self-end`};
`;

export const StyledText = tw.span`
  text-gray-800
  text-sm
`;