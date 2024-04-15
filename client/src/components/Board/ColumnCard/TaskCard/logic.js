import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendRequest, requestMethods } from '../../../../core/tools/apiRequest';
import { updateTask, deleteTask } from '../../../../store/SelectedBoard';

export const useTaskCardLogic = (task, columnId) => {
    const [taskData, setTaskData] = useState({ title: task.title, description: task.description });
    const [isHovered, setIsHovered] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
    });

    const dispatch = useDispatch();

    const handleTaskInputsChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleEdit = async () => {
        try {
            const response = await sendRequest(requestMethods.PUT, `/tasks/${task._id}`, taskData);
            if (response.status !== 200) throw new Error();
            dispatch(updateTask({ columnId, task: response.data }));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleTaskDelete = async () => {
        try {
            const response = await sendRequest(requestMethods.DELETE, `/tasks/${task._id}`, null);
            if (response.status !== 200) throw new Error();
            dispatch(deleteTask({ columnId, taskId: task._id }));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        isHovered,
        taskData,
        setIsPopupOpen,
        setIsHovered,
        isPopupOpen,
        handleEdit,
        handleTaskInputsChange,
        handleTaskDelete,
    };
};
