import React from "react";

const Loading = ({ loading, width, height }) => {
    return (
        <div>
            {loading && <img alt="loading" src='https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif' width={width} height={height} />}
        </div>
    );
};

Loading.defaultProps = {
    loading: true,
    width: 100,
    height: 100,
};

export default Loading;