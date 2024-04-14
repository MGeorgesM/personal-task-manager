import { useState } from 'react';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import './index.css';
import Button from '../Button/Button';

const Popup = ({ handleProceed, handleCancel, handleDelete, handleInputChange, isPopupOpen, data }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    return (
        <>
            <div className="popup-container flex center black-bg-trsp">
                <div className="popup-main white-bg flex column center box-shadow border border-radius">
                    <div className="popup-header">
                        <h2 className="size-l bold">{isPopupOpen.actionTitle}</h2>
                    </div>

                    {Object.keys(data).map((property, index) => {
                        return (
                            <input
                                key={index}
                                className="input-btn-lg"
                                type="text"
                                placeholder={property}
                                name={property}
                                value={data[property]}
                                onChange={handleInputChange}
                            />
                        );
                    })}
                    <div className="popup-btns flex space-between">
                        <Button clickHandler={handleProceed} text={'Submit'} color={'primary-btn'} size={'btn'} />
                        <Button clickHandler={handleCancel} text={'Cancel'} color={'secondary-btn'} size={'btn'} />
                        <Button
                            clickHandler={() => setShowConfirmation(true)}
                            text={'Delete'}
                            color={'secondary-btn'}
                            size={'btn'}
                        />
                    </div>
                </div>
            </div>
            {showConfirmation && (
                <ConfirmationPopup handleProceed={handleDelete} handleCancel={() => setShowConfirmation(false)} />
            )}
        </>
    );
};

export default Popup;
