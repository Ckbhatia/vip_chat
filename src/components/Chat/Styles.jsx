import tw, { styled } from "twin.macro";

export const StyledChatContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledInput = tw.input`
  placeholder-gray-500
  px-4 py-2 
  border-2 border-gray-200 rounded-md
`;

export const StyledButton = tw.button`
  px-4 py-2
  border-2 border-blue-400 rounded-md
  bg-blue-400
  text-white
  ml-2
  hover:bg-blue-500

  disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed
`;
