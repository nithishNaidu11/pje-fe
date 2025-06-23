import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { QuizBanner } from "components/quiz";

import { QUIZ_VIDEO_LINKS } from "Constants";

export const QuizVideoPlayer = () => {
  const theme = useTheme();
  const { videoCode } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ height: "100vh", background: "rgba(0, 0, 0, 1)" }}>
      <QuizBanner />
      <Box
        sx={{
          display: isMobile ? "flex" : "block",
          justifyContent: isMobile ? "center" : "initial",
          alignItems: isMobile ? "center" : "initial",
          minHeight: isMobile ? "100vh" : "auto", // center vertically on mobile
          position: "relative",
          paddingTop: isMobile ? 0 : "56.25%", // 16:9 aspect ratio only on larger screens
          marginTop: isMobile ? "-88px" : "54px",
        }}
      >
        <ReactPlayer
          url={QUIZ_VIDEO_LINKS[videoCode] ?? ""}
          controls
          playing={false}
          width={isMobile ? "100%" : "100%"}
          height={isMobile ? "auto" : "calc(100% - 148px)"}
          style={{
            position: isMobile ? "relative" : "absolute",
            top: isMobile ? "initial" : 0,
            left: isMobile ? "initial" : 0,
            maxWidth: isMobile ? "100%" : "none",
          }}
        />
      </Box>
    </Box>
  );
};
