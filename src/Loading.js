import { BounceLoader, BarLoader, BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import React from "react";

const loaderCSS = css`
  margin-top: 25px;
  margin-bottom: 25px;
`;

const Loading = () => {
  const isDark = localStorage.getItem("darkMode") === "true" || true;

  return (
    <div
      className={`loading ${isDark ? "dark-mode" : "light-mode"}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: isDark
          ? "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: isDark ? "#f7fafc" : "#2d3748",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", marginBottom: "2rem", fontWeight: "700" }}
      >
        Loading Weather Data...
      </h1>
      <BounceLoader
        css={loaderCSS}
        size={60}
        color={isDark ? "#ffd89b" : "#667eea"}
        loading
      />
      <BarLoader
        css={loaderCSS}
        width={200}
        color={isDark ? "#19547b" : "#764ba2"}
        loading
      />
      <BeatLoader
        css={loaderCSS}
        size={20}
        color={isDark ? "#ffd89b" : "#667eea"}
        loading
      />
    </div>
  );
};

export default Loading;
