const Popup = ({ handleProceed, handleCancel, handleDelete, handleInputChange, isPopupOpen, data }) => {
    
    return (
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

                {/* <input
                    className="input-btn-lg"
                    type="text"
                    placeholder="title"
                    name="title"
                    value={data.title}
                    onChange={handleInputChange}
                />

                {isPopupOpen.entity !== 'column' && (
                    <input
                        className="input-btn-lg"
                        type="text"
                        placeholder="description"
                        name="description"
                        value={data.description}
                        onChange={handleInputChange}
                    />
                )} */}

                <div className="popup-btns flex space-between">
                    <button className="primary-btn border-radius" onClick={handleProceed}>
                        Submit
                    </button>
                    <button className="secondary-btn border-radius" onClick={handleCancel}>
                        Cancel
                    </button>
                    {handleDelete && (
                        <button className="secondary-btn border-radius" onClick={handleDelete}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;
