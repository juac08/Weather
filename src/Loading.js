import { BounceLoader, BarLoader, BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import React from 'react';

const loaderCSS = css`
  margin-top: 25px;
  margin-bottom: 25px;
`
const Loading = () => {
  return (
    <div className="loading">
    <h1>Loading ....</h1>
    <br />
    <BounceLoader css={loaderCSS} size={24} color="red" loading />

    <BarLoader css={loaderCSS} size={48} color="orange" loading />

    <BeatLoader css={loaderCSS} size={72} color="maroon" loading />
  </div>
  )
}

export default Loading
