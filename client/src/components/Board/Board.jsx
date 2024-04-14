import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setSelectedBoard } from '../../store/SelectedBoard';

import ColumnCard from './ColumnCard/ColumnCard';
import EditPopup from '../Elements/EditPopup/EditPopup';

import './index.css';

const Board = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedBoard = useSelector((global) => global.selectedBoardSlice.selectedBoard);
    const [draggedTask, setDraggedTask] = useState(null);

    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
    });
    const [boardData, setBoardData] = useState({
        title: selectedBoard?.title || '',
        description: selectedBoard?.description || '',
    });

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


    if (selectedBoard)
        return (
            <>
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
                                        handleDragStart={handleDragStart}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                {isPopupOpen.isOpen === true && isPopupOpen.entity === 'board' && <EditPopup />}
            </>
        );
};

export default Board;
