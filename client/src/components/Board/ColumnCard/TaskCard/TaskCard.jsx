import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import Popup from '../../../Elements/Popup/Popup';

import { sendRequest, requestMethods } from '../../../../core/tools/apiRequest';
import { updateTask, deleteTask } from '../../../../store/SelectedBoard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const TaskCard = ({ task, columnId, onDragStart }) => {
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

    const handleEdit = async (columnId, taskId, taskData) => {
        console.log(taskData);
        try {
            const response = await sendRequest(requestMethods.PUT, `/tasks/${taskId}`, taskData);
            if (response.status !== 200) throw new Error();
            console.log(response.data);
            dispatch(updateTask({ columnId, task: response.data }));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleTaskDelete = async (columnId, taskId) => {
        try {
            const response = await sendRequest(requestMethods.DELETE, `/tasks/${taskId}`, null);
            if (response.status !== 200) throw new Error();
            dispatch(deleteTask({ columnId, taskId }));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div
                className="padding-m task-card"
                draggable="true"
                onDragStart={(e) => onDragStart(e)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <p className="size-m boder">{taskData.title}</p>
                <p className="size-m boder light-text">{taskData.description}</p>
                {isHovered && (
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="board-card-icon light-text"
                        onClick={() =>
                            setIsPopupOpen({
                                type: 'edit',
                                entity: 'task',
                                actionTitle: 'Edit task',
                                isOpen: true,
                            })
                        }
                    />
                )}
            </div>
            {isPopupOpen.isOpen === true && isPopupOpen.entity === 'task' && isPopupOpen.type === 'edit' && (
                <Popup
                    handleProceed={() => handleEdit(columnId, task._id, taskData)}
                    handleInputChange={handleTaskInputsChange}
                    handleCancel={() => setIsPopupOpen({ ...isPopupOpen, isOpen: false })}
                    handleDelete={() => handleTaskDelete(columnId, task._id)}
                    isPopupOpen={isPopupOpen}
                    data={taskData}
                />
            )}
        </>
    );
};

export default TaskCard;
