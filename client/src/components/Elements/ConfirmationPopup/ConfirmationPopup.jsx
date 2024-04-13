import React from 'react';
import Button from '../Button/Button';

import './index.css';

const ConfirmationPopup = ({ handleContinue, handleCancel }) => {
    return (
        <div className="popupmain black-bg-trsp flex center">
            <div className="popupmain-inner-s white-bg flex column space-evenly border-radius-m">
                <div className="popup-header-s flex center">
                    <p className="size-l bold">Are you sure?</p>
                </div>
                <div className="popup-btns flex center">
                    <Button color={'primary-btn'} size={'btn-s'} clickHandler={handleContinue} text={'Yes'} />
                    <Button color={'secondary-btn'} size={'btn-s'} clickHandler={handleCancel} text={'Cancel'} />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
