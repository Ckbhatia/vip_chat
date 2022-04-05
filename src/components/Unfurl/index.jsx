import React from "react";
import { ImSpinner4 } from "react-icons/im";
import { STATUS } from "../../constants";
import { getSongCollection } from "../../services";
import { StyledSpinnerContainer } from "../Common";
import { StyledLinkUrl,
  StyledArtist,
  StyledCard,
  StyledImageContainer,
  StyledInformationContainer,
  StyledTitle, } from "./Styles";

const Unfurl = ({ url }) => {
  const [songResult, setSongResult] = React.useState(null);
  const [songResultStatus, setSongResultStatus] = React.useState(STATUS.IDLE);

  React.useEffect(() => {
    const resuls = url?.match(/(\D*)(\d+)/i);
    const id = resuls?.[2];
    if (id) {
      setSongResultStatus(STATUS.PENDING);
      (async () => {
        const songDetails = await getSongCollection(id);
        setSongResult(songDetails);
        setSongResultStatus(STATUS.RESOLVED);
      })();
    }
  }, [url]);

  const artworkUrl60 = songResult?.artworkUrl60 || "";
  const trackName =
    songResult?.trackName || songResult?.collectionCensoredName || "";
  const artistName = songResult?.artistName || "";
  const trackUrl = songResult?.trackViewUrl || songResult?.artistViewUrl || "";

  return (
    <StyledCard>
      {songResultStatus === STATUS.PENDING ? (
        <StyledSpinnerContainer>
          <ImSpinner4 />
        </StyledSpinnerContainer>
      ) : (
        <>
          <StyledImageContainer>
            <img src={artworkUrl60} alt="artwork" />
          </StyledImageContainer>
          <StyledInformationContainer>
            <StyledTitle>{trackName}</StyledTitle>
            <StyledArtist>{artistName}</StyledArtist>
            <StyledLinkUrl href={trackUrl} target="_blank">{trackUrl}</StyledLinkUrl>
          </StyledInformationContainer>
        </>
      )}
    </StyledCard>
  );
};

export default Unfurl;
