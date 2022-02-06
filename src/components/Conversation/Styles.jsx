import tw from "twin.macro";

export const StyledMessageListContainer = tw.ul`
  flex flex-col
  list-none
`

export const StyledActionContainer =tw.div`
  flex flex-row
  mt-2
`;

export const StyledInput = tw.input`
  placeholder-gray-500
  px-4 py-2 
  w-full
  border-2 border-gray-200 rounded-md
`;