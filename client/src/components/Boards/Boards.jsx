import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setBoards } from '../../store/Boards';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './index.css';

const Boards = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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

    const BoardCard = ({ board }) => {
        const [isHoverd, setIsHoverd] = useState(false);
        const navigate = useNavigate();

        const handleBoardEdit = () => {
            console.log('Edit board:', board);
        };

        return (
            <div
                className="board-card secondary-bg flex column center box-shadow border"
                onMouseEnter={() => setIsHoverd(true)}
                onMouseLeave={() => setIsHoverd(false)}
                onClick = {() => navigate(`/board/${board._id}`)}
            >
                <p className="size-l bold">{board.title}</p>
                <p className="size-m">{board.description}</p>
                {isHoverd && (
                    <FontAwesomeIcon icon={faEdit} className="board-card-icon light-text" onClick={handleBoardEdit} />
                )}
            </div>
        );
    };

    const AddBoardPopup = ({ actionTitle, entity, ...inputs }) => {
        const [boardData, setBoardData] = useState({
            title: '',
            description: '',
        });

        const handleInputChange = (e) => {
            setBoardData({ ...boardData, [e.target.name]: e.target.value });
        };

        const handleCreateBoard = async () => {
            try {
                const response = await sendRequest(requestMethods.POST, '/boards', boardData);
                if (response.status !== 201) throw new Error();
                dispatch(setBoards(response.data.boards));
                setIsPopupOpen(false);
            } catch (error) {
                console.log(error);
            }
        };

        const InputField = ({ inputTitle, entity }) => {
            return (
                <input
                    className="input-btn-lg"
                    type="text"
                    placeholder={inputTitle}
                    name={inputTitle}
                    value={entity.title}
                    onChange={handleInputChange}
                />
            );
        };

        return (
            <div className="popup-container flex center black-bg-trsp">
                <div className="popup-main white-bg flex column center box-shadow border border-radius">
                    <div className="popup-header">
                        <h2 className="size-l bold">{actionTitle}</h2>
                    </div>
                    {Object.keys(inputs).map((input) => (
                        <InputField key={input} inputTitle={input} entity={entity} />
                    ))}

                    {/* <textarea
                        className="input-btn-lg"
                        placeholder="Description"
                        name="description"
                        value={boardData.description}
                        onChange={handleInputChange}
                    ></textarea> */}
                    <div className="popup-btns flex space-between">
                        <button className="primary-btn border-radius" onClick={handleCreateBoard}>
                            Create
                        </button>
                        <button className="secondary-btn border-radius" onClick={() => setIsPopupOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="boards-header flex space-between">
                <h1 className="size-xl bold">Boards</h1>
                <button className="primary-btn border-radius" onClick={() => setIsPopupOpen(true)}>
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
            {isPopupOpen && <AddBoardPopup actionTitle={'Create new board'} entity={'board'} title='title' description='description'/>}
        </>
    );
};

export default Boards;
