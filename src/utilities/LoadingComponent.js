import React from 'react';
import { css } from '@emotion/react';
import RiseLoader from 'react-spinners/CircleLoader';

const cssOverride = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
const LoadingComponent = () => {
    return (
        <RiseLoader color='blue' loading={true} css={cssOverride} />
    )
};

export default LoadingComponent;