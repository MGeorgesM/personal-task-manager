import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setColumns, setSelectedBoard } from '../../store/SelectedBoard';

import './index.css';

const Board = () => {
    const dispatch = useDispatch();
    const selectedBoard = useSelector((global) => global.selectedBoardSlice.selectedBoard);

    const { id } = useParams();

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/boards/${id}`, null);
                if (response.status !== 200) throw new Error();
                console.log(response.data);
                dispatch(setSelectedBoard(response.data));
                dispatch(setColumns(response.data.columns));
            } catch (error) {
                console.log(error);
            }
        };
        getBoardData();
    }, [id]);

    const ColumnCard = ({ column }) => {
        const TaskCard = ({ task }) => {
            return (
                <div className="padding-m task-card">
                    <p className="size-m boder">{task.title}</p>
                    <p className="size-m boder light-text">{task.description}</p>
                </div>
            );
        };
        return (
            <div className="board-overview-column-card light-gray-bg border border-radius-m box-shadow">
                <div className="column-header padding-m border-btm bold">
                    <p className="size-l">{column.title}</p>
                </div>
                {column.tasks.length > 0 && column.tasks.map((task) => <TaskCard key={task._id} task={task} />)}
            </div>
        );
    };

    if (selectedBoard)
        return (
            <div className="board-overview-container">
                <div className="board-overview-main">
                    <div className="board-overview-header flex column center">
                        <p className="size-xl bold">{selectedBoard.title}</p>
                        <p className="size-m">{selectedBoard.description}</p>
                    </div>
                    <div className="board-overview-columns flex">
                        {selectedBoard.columns.length > 0 &&
                            selectedBoard.columns.map((column) => <ColumnCard key={column._id} column={column} />)}
                    </div>
                </div>
            </div>
        );
};

export default Board;
