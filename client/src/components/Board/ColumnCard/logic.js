import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteColumn, updateColumn, addTask } from '../../../store/SelectedBoard';
import { sendRequest, requestMethods } from '../../../core/tools/apiRequest';

export const useColumnCardLogic = (column) => {
    const [columnData, setColumnData] = useState({ title: column.title });
    const [newTaskData, setNewTaskData] = useState({ title: '', description: '' });
    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
    });

    const dispatch = useDispatch();

    const handleColumnInputChange = (e) => {
        setColumnData({ ...columnData, [e.target.name]: e.target.value });
    };

    const handleNewTaskInputChange = (e) => {
        setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value });
    };

    const handleColumnDelete = async () => {
        try {
            const response = await sendRequest(requestMethods.DELETE, `/columns/${column._id}`, null);
            if (response.status !== 200) throw new Error();
            dispatch(deleteColumn(column._id));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleColumnEdit = async () => {
        try {
            const response = await sendRequest(requestMethods.PUT, `/columns/${column._id}`, { ...columnData });
            if (response.status !== 200) throw new Error();
            console.log(response.data);
            dispatch(updateColumn(response.data));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateTask = async (columnId, newTaskData) => {
        try {
            const response = await sendRequest(requestMethods.POST, '/tasks', { ...newTaskData, columnId });
            if (response.status !== 201) throw new Error();
            dispatch(addTask({ columnId, task: response.data }));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        columnData,
        newTaskData,
        isPopupOpen,
        setIsPopupOpen,
        handleColumnEdit,
        handleCreateTask,
        handleColumnDelete,
        handleColumnInputChange,
        handleNewTaskInputChange,
    };
};
