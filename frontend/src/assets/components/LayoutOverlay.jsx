
import React from 'react';

const LayoutOverlay = () => {

    return (
        <>
            <div className="layout-overlay" data-view="app#overlay">
                <div className="overlay-bg" data-role="overlay-bg"></div>
                <div className="overlay" data-scrollable="" data-role="overlay-wrap" tabIndex="-1">
                    <div className="overlay-close" data-role="overlay-hide">
                        <div className="overlay-close_inner">
                            <div className="overlay-close_line"></div>
                            <div className="overlay-close_line"></div>
                        </div>
                    </div>
                    <div className="overlay-content" data-role="overlay-content">
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutOverlay;