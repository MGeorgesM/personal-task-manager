// import './index.css';

// const EditPopup = ({ handleProceed, handleInputChange, handleCancel, handleDelete = null, isPopupOpen, ...inputs, data}) => {
//     return (
//         <div className="popup-container flex center black-bg-trsp">
//             <div className="popup-main white-bg flex column center box-shadow border border-radius">
//                 <div className="popup-header">
//                     <h2 className="size-l bold">{isPopupOpen.actionTitle}</h2>
//                 </div>
//                 {Object.keys(inputs).map((input) => (
//                     <input
//                         key={input}
//                         className="input-btn-lg"
//                         type="text"
//                         placeholder={input}
//                         name={input}
//                         onChange={handleInputChange}
//                     />
//                 ))}
//                 <div className="popup-btns flex space-between">
//                     <button className="primary-btn border-radius" onClick={handleProceed}>
//                         {isPopupOpen.type === 'create' ? 'Create' : 'Edit'}
//                     </button>
//                     <button className="secondary-btn border-radius" onClick={handleCancel}>
//                         Cancel
//                     </button>
//                     {handleDelete && (
//                         <button className="secondary-btn border-radius" onClick={handleDelete}>
//                             Delete
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditPopup;
