import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setSelectedBoard } from '../../store/SelectedBoard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './index.css';

const Board = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedBoard = useSelector((global) => global.selectedBoardSlice.selectedBoard);
    const [draggedTask, setDraggedTask] = useState(null);

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/boards/${id}`, null);
                if (response.status !== 200) throw new Error();
                console.log(response.data);
                dispatch(setSelectedBoard(response.data));
            } catch (error) {
                console.log(error);
            }
        };
        getBoardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleDragStart = (task) => {
        setDraggedTask(task);
    };

    const handleDragOver = (columnId, e) => {
        e.preventDefault();
    };

    const handleDrop = async (columnId, e) => {
        e.preventDefault();
        const updatedColumns = selectedBoard.columns.map((column) => {
            if (column._id === columnId) {
                return { ...column, tasks: [...column.tasks, draggedTask] };
            } else if (column.tasks.find((task) => task._id === draggedTask._id)) {
                return { ...column, tasks: column.tasks.filter((task) => task._id !== draggedTask._id) };
            }
            return column;
        });

        dispatch(setSelectedBoard({ ...selectedBoard, columns: updatedColumns }));

        try {
            const response = await sendRequest(requestMethods.PUT, `/tasks/${draggedTask._id}`, { columnId });
            if (response.status === 200) {
                setDraggedTask(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const ColumnCard = ({ column, onDragOver, onDrop }) => {
        const handleEdit = () => {
            console.log('Edit column:', column);
        };
        const TaskCard = ({ task, onDragStart }) => {
            const [isHovered, setIsHovered] = useState(false);
            return (
                <div
                    className="padding-m task-card"
                    draggable="true"
                    onDragStart={(e) => onDragStart(e)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <p className="size-m boder">{task.title}</p>
                    <p className="size-m boder light-text">{task.description}</p>
                    {isHovered && (
                        <FontAwesomeIcon icon={faEdit} className="board-card-icon light-text" onClick={handleEdit} />
                    )}
                </div>
            );
        };
        return (
            <div
                className="board-overview-column-card light-gray-bg border border-radius-m box-shadow"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, column._id)}
            >
                <div className="column-header padding-m border-btm bold">
                    <p
                        className="size-l"
                        // onMouseEnter={() => setIsHovered(true)}
                        // onMouseLeave={() => setIsHovered(false)}
                    >
                        {column.title}
                    </p>
                </div>
                {column.tasks.length > 0 &&
                    column.tasks.map((task) => (
                        <TaskCard key={task._id} task={task} onDragStart={() => handleDragStart(task)} />
                    ))}
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
                            selectedBoard.columns.map((column) => (
                                <ColumnCard
                                    key={column._id}
                                    column={column}
                                    onDragOver={(e) => handleDragOver(column._id, e)}
                                    onDrop={(e) => handleDrop(column._id, e)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        );
};

export default Board;
