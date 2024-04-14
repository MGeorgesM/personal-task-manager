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
    const boards = useSelector((global) => global.boardsSlice.boards);
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

    // const Popup = ({ handleProceed, handleCancel, handleDelete, handleInputChange, data }) => {
    //     return (
    //         <div className="popup-container flex center black-bg-trsp">
    //             <div className="popup-main white-bg flex column center box-shadow border border-radius">
    //                 <div className="popup-header">
    //                     <h2 className="size-l bold">{isPopupOpen.actionTitle}</h2>
    //                 </div>

    //                 <input
    //                     className="input-btn-lg"
    //                     type="text"
    //                     placeholder="title"
    //                     name="title"
    //                     value={data.title}
    //                     onChange={handleInputChange}
    //                 />

    //                 {isPopupOpen.entity !== 'column' && (
    //                     <input
    //                         className="input-btn-lg"
    //                         type="text"
    //                         placeholder="description"
    //                         name="description"
    //                         value={data.description}
    //                         onChange={handleInputChange}
    //                     />
    //                 )}

    //                 <div className="popup-btns flex space-between">
    //                     <button className="primary-btn border-radius" onClick={handleProceed}>
    //                         Submit
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

    const BoardCard = ({ board }) => {
        const [boardData, setBoardData] = useState({
            title: board.title,
            description: board.description,
        });
        const [isHovered, setIsHovered] = useState(false);
        const navigate = useNavigate();
        const handleInputChange = (e) => {
            setBoardData({ ...boardData, [e.target.name]: e.target.value });
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
                        handleCancel={handleCancel}
                        handleDelete={() => handleBoardDelete(board._id)}
                        isPopupOpen={isPopupOpen}
                        data={boardData}
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
