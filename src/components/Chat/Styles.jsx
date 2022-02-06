import tw from "twin.macro";

export const StyledMain = tw.main`
  max-h-40
  max-w-sm
  px-4 
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
`;
