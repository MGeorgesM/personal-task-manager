import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendRequest, requestMethods } from '../../../core/tools/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../../../store/Boards';

import Popup from '../../Elements/Popup/Popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import '../index.css';

const BoardCard = ({ board, boards }) => {
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

    const handleBoardEdit = async (id) => {
        try {
            const response = await sendRequest(requestMethods.PUT, `/boards/${id}`, boardData);
            if (response.status !== 200) throw new Error();
            console.log(response.data);
            dispatch(setBoards(response.data));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleBoardDelete = async (id) => {
        try {
            const response = await sendRequest(requestMethods.DELETE, `/boards/${id}`, null);
            if (response.status !== 200) throw new Error();
            const remaingBoards = boards.filter((board) => board._id !== id);
            dispatch(setBoards(remaingBoards));
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
            {isPopupOpen.isOpen === true && isPopupOpen.type === 'edit' && (
                <Popup
                    handleProceed={() => handleBoardEdit(board._id)}
                    handleInputChange={handleInputChange}
                    handleCancel={() => setIsPopupOpen({ ...isPopupOpen, isOpen: false })}
                    handleDelete={() => handleBoardDelete(board._id)}
                    isPopupOpen={isPopupOpen}
                    data={boardData}
                />
            )}
        </>
    );
};

export default BoardCard;
