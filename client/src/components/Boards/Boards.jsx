import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setBoards } from '../../store/Boards';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import '../Elements/Popup/index.css';
import Popup from '../Elements/Popup/Popup';

const Boards = () => {
    const [newBoardData, setNewBoardData] = useState({
        title: '',
        description: '',
    });
    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
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

    const handleNewBoardInputChange = (e) => {
        setNewBoardData({ ...newBoardData, [e.target.name]: e.target.value });
    };

    const handleCancel = (e) => {
        setIsPopupOpen({ ...isPopupOpen, isOpen: false });
    };

    const handleCreateBoard = async () => {
        try {
            const response = await sendRequest(requestMethods.POST, '/boards', newBoardData);
            if (response.status !== 201) throw new Error();
            dispatch(setBoards(response.data.boards));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
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
                <Popup
                    handleProceed={handleCreateBoard}
                    handleInputChange={handleNewBoardInputChange}
                    handleCancel={handleCancel}
                    isPopupOpen={isPopupOpen}
                    data={newBoardData}
                />
            )}
        </>
    );
};

export default Boards;
