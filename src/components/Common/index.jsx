import tw, { styled } from "twin.macro";

export const StyledContainer = styled.div`
  max-width: 330px;
  margin: 0 auto;
  text-align: center;
`;

export const StyledButton = tw.button`
  px-4 py-2
  border-2 border-blue-200 rounded-md
  bg-blue-200
  text-black
  ml-2
  hover:bg-blue-300 border-blue-200 
`;

export const StyledSpinnerContainer = styled.div`
  ${tw`flex justify-center items-center`}
`;