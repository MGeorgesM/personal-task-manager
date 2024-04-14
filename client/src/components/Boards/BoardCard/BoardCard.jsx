import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendRequest, requestMethods } from '../../../core/tools/apiRequest';
import { useDispatch } from 'react-redux';
import { deleteBoard, setBoards } from '../../../store/Boards';

import Popup from '../../Elements/Popup/Popup';
import ConfirmationPopup from '../../Elements/ConfirmationPopup/ConfirmationPopup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import '../index.css';

const BoardCard = ({ board }) => {
    const [isHovered, setIsHovered] = useState(false);

    const [boardData, setBoardData] = useState({
        title: board.title,
        description: board.description,
    });

    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setBoardData({ ...boardData, [e.target.name]: e.target.value });
    };

    const handleBoardEdit = async () => {
        try {
            const response = await sendRequest(requestMethods.PUT, `/boards/${board._id}`, boardData);
            if (response.status !== 200) throw new Error();
            console.log(response.data);
            dispatch(setBoards(response.data));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleBoardDelete = async () => {
        console.log('delete board')
        try {
            const response = await sendRequest(requestMethods.DELETE, `/boards/${board._id}`, null);
            if (response.status !== 200) throw new Error();
            dispatch(deleteBoard(board._id));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div
                className="board-card secondary-bg flex column center box-shadow border"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <p className="size-l bold" onClick={() => navigate(`/board/${board._id}`)}>
                    {board.title}
                </p>
                <p className="size-m">{board.description}</p>
                {isHovered && (
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="board-card-icon light-text"
                        onClick={() =>
                            setIsPopupOpen({
                                type: 'edit',
                                entity: 'board',
                                actionTitle: 'Edit board',
                                isOpen: true,
                            })
                        }
                    />
                )}
            </div>
            {isPopupOpen.isOpen === true && isPopupOpen.type !== 'confirm' && (
                <Popup
                    handleProceed={handleBoardEdit}
                    handleInputChange={handleInputChange}
                    handleCancel={() => setIsPopupOpen({ ...isPopupOpen, isOpen: false })}
                    handleDelete={handleBoardDelete}
                    isPopupOpen={isPopupOpen}
                    data={boardData}
                />
            )}
            {/* {isPopupOpen.isOpen === true && isPopupOpen.type === 'confirm' && (
                <ConfirmationPopup
                    handleProceed={handleBoardDelete}
                    handleCancel={() => setIsPopupOpen({ ...isPopupOpen, isOpen: false })}
                />
            )} */}
        </>
    );
};

export default BoardCard;
