import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './index.css';

const Popup = ({
    handleContinue,
    handleImageSelect,
    handleImageUpload,
    handleCaptionChange,
    caption,
    setCaption,
    image,
    setImage,
    setShowPopup,
}) => {
    return (
        <div className="popupmain flex column center black-bg-trsp">
            <div className="exit-btn white-text flex center">
                <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                        setShowPopup(false);
                        setImage(null);
                        setCaption('');
                    }}
                />
            </div>
            <div className="popupmain-inner white-bg flex column space-between box-shadow border-radius-m">
                <div className="popup-header flex center">
                    <h1 className="size-l bold">Create a new post</h1>
                </div>
                {image && <img src={image} alt="post" />}
                {!image && (
                    <div className="popup-image flex column center">
                        <img src="./images/assets/new-post.jpg" alt="" />
                        <label
                            htmlFor="image-upload"
                            className="upload-btn primary-btn flex center border-radius size-m"
                        >
                            Select from computer
                        </label>
                    </div>
                )}
                <div className="upload-caption white-bg flex">
                    {image && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter caption"
                                value={caption}
                                onChange={handleCaptionChange}
                            />
                            <button className="share-btn bold size-m no-bg primary-text" onClick={handleImageUpload}>
                                Share
                            </button>
                        </>
                    )}
                </div>

                <div className="image-upload hidden">
                    <div className="popupmain-image">
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            name="image"
                            onChange={handleImageSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
