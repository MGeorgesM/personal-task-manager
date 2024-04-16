import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setSelectedBoard } from '../../store/SelectedBoard';

export const useBoardLogic = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const selectedBoard = useSelector((global) => global.selectedBoardSlice.selectedBoard);

    const [draggedTask, setDraggedTask] = useState(null);
    const [tags, setTags]

    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
    });
    const [newColumnData, setNewColumnData] = useState({
        title: '',
    });

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/boards/${id}`, null);
                if (response.status !== 200) throw new Error();
                dispatch(setSelectedBoard(response.data));
            } catch (error) {
                console.log(error);
            }
        };

        const getUserTags = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/tags', null);
                if(response.status !== 200) throw new Error();
                dispatch(setSelectedBoard(response.data));
            } catch (error) {
                console.log(error);               
            }
        }
        getBoardData();
        getUserTags();
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

    const handleCreateColumn = async () => {
        try {
            const response = await sendRequest(requestMethods.POST, '/columns', {
                ...newColumnData,
                boardId: selectedBoard._id,
            });
            if (response.status !== 201) throw new Error();
            dispatch(setSelectedBoard({ ...selectedBoard, columns: [...selectedBoard.columns, response.data] }));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateColumnCancel = () => {
        setIsPopupOpen({ ...isPopupOpen, isOpen: false });
    };

    const handleCreateColumnInputChange = (e) => {
        setNewColumnData({ ...newColumnData, [e.target.name]: e.target.value });
    };

    return {
        selectedBoard,
        handleDragOver,
        handleDrop,
        handleDragStart,
        handleCreateColumn,
        handleCreateColumnCancel,
        handleCreateColumnInputChange,
        newColumnData,
        isPopupOpen,
        setIsPopupOpen,
    };
};
