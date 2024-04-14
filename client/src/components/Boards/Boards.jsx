import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setBoards } from '../../store/Boards';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import EditPopup from '../Elements/EditPopup/EditPopup';

import './index.css';

const Boards = () => {
    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
    });
    const [boardData, setBoardData] = useState({
        title: '',
        description: '',
    });
    const boards = useSelector((global) => global.boardsSlice.boards);
    const dispatch = useDispatch();

    useEffect(() => {
        const getBoards = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/boards', null);
                if (response.status !== 200) throw new Error();
                dispatch(setBoards(response.data));
            } catch (error) {
                console.log(error);
            }
        };

        getBoards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e) => {
        setBoardData({ ...boardData, [e.target.name]: e.target.value });
    };

    const handleCancel = (e) => {
        setIsPopupOpen({ ...isPopupOpen, isOpen: false });
    };

    const handleCreateBoard = async () => {
        try {
            const response = await sendRequest(requestMethods.POST, '/boards', boardData);
            if (response.status !== 201) throw new Error();
            dispatch(setBoards(response.data.boards));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleBoardEdit = async (id) => {
        try {
            const response = await sendRequest(requestMethods.PUT, `/boards/${id}`, boardData);
            if (response.status !== 200) throw new Error();
            dispatch(setBoards(response.data));
            setIsPopupOpen({ ...isPopupOpen, isOpen: true });
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

    const BoardCard = ({ board }) => {
        const [isHovered, setIsHovered] = useState(false);
        const navigate = useNavigate();

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
                    <EditPopup
                        handleProceed={() => handleBoardEdit(board._id)}
                        handleInputChange={handleInputChange}
                        handleCancel={handleCancel}
                        handleDelete={() => handleBoardDelete(board._id)}
                        isPopupOpen={isPopupOpen}
                        title={'title'}
                        description={'description'}
                    />
                )}
            </>
        );
    };

    return (
        <>
            <div className="boards-header flex space-between">
                <h1 className="size-xl bold">Boards</h1>
                <button
                    className="primary-btn border-radius"
                    onClick={() =>
                        setIsPopupOpen({
                            type: 'create',
                            entity: 'board',
                            actionTitle: 'Create new board',
                            isOpen: true,
                        })
                    }
                >
                    Create new board
                </button>
            </div>
            <div className="boards-container flex">
                {boards.length > 0 ? (
                    boards.map((board) => <BoardCard key={board._id} board={board} />)
                ) : (
                    <p className="size-l bold">No boards yet</p>
                )}
            </div>
            {isPopupOpen.isOpen === true && isPopupOpen.type === 'create' && (
                <EditPopup
                    handleProceed={handleCreateBoard}
                    handleInputChange={handleInputChange}
                    handleCancel={handleCancel}
                    isPopupOpen={isPopupOpen}
                    title={'title'}
                    description={'description'}
                />
            )}
        </>
    );
};

export default Boards;
