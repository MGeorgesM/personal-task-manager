import React, { useState } from 'react';

import { updateTask, deleteTask, deleteColumn, updateColumn, addTask } from '../../../store/SelectedBoard';
import { useDispatch } from 'react-redux';
import { sendRequest, requestMethods } from '../../../core/tools/apiRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ColumnCard = ({ column, onDragOver, onDrop, handleDragStart }) => {
    const [isPopupOpen, setIsPopupOpen] = useState({});
    const [columnData, setColumnData] = useState({ title: '' });
    const [newTaskData, setNewTaskData] = useState({ title: '', description: '' });

    const dispatch = useDispatch();

    const handleCancel = (e) => {
        setIsPopupOpen({ ...isPopupOpen, isOpen: false });
    };

    const handleColumnInputChange = (e) => {
        setColumnData({ ...columnData, [e.target.name]: e.target.value });
    };

    const handleNewTaskInputChange = (e) => {
        setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value });
    };

    const handleColumnDelete = async (columnId) => {
        try {
            const response = await sendRequest(requestMethods.DELETE, `/columns/${columnId}`, null);
            if (response.status !== 200) throw new Error();
            dispatch(deleteColumn(columnId));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleColumnEdit = async (columnId) => {
        try {
            const response = await sendRequest(requestMethods.PUT, `/columns/${columnId}`, { columnData });
            if (response.status !== 200) throw new Error();
            dispatch(updateColumn(response.data));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateTask = async (columnId, newTaskData) => {
        try {
            const response = await sendRequest(requestMethods.POST, '/tasks', {...newTaskData, columnId});
            if (response.status !== 201) throw new Error();
            dispatch(addTask({columnId, task: response.data}));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const handleTaskEdit = async (columnId, taskId, taskData) => {
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
            dispatch(deleteTask(columnId, taskId));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    const EditPopup = ({ handleProceed, handleCancel, handleDelete, handleInputChange, data }) => {
        return (
            <div className="popup-container flex center black-bg-trsp">
                <div className="popup-main white-bg flex column center box-shadow border border-radius">
                    <div className="popup-header">
                        <h2 className="size-l bold">{isPopupOpen.actionTitle}</h2>
                    </div>

                    <input
                        className="input-btn-lg"
                        type="text"
                        placeholder="title"
                        name="title"
                        value={data.title}
                        onChange={handleInputChange}
                    />

                    <input
                        className="input-btn-lg"
                        type="text"
                        placeholder="description"
                        name="description"
                        value={data.description}
                        onChange={handleInputChange}
                    />

                    <div className="popup-btns flex space-between">
                        <button className="primary-btn border-radius" onClick={handleProceed}>
                            Submit
                        </button>
                        <button className="secondary-btn border-radius" onClick={handleCancel}>
                            Cancel
                        </button>
                        {handleDelete && (
                            <button className="secondary-btn border-radius" onClick={handleDelete}>
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const TaskCard = ({ task, onDragStart }) => {
        const [taskData, setTaskData] = useState({ title: task.title, description: task.description });
        const [isHovered, setIsHovered] = useState(false);

        const handleTaskInputsChange = (e) => {
            setTaskData({ ...taskData, [e.target.name]: e.target.value });
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
                {isPopupOpen.isOpen === true && isPopupOpen.entity === 'task' && (
                    <EditPopup
                        handleProceed={() => handleTaskEdit(column._id, task._id, taskData)}
                        handleInputChange={handleTaskInputsChange}
                        handleCancel={handleCancel}
                        handleDelete={() => handleTaskDelete(column._id, task._id)}
                        data={taskData}
                    />
                )}
            </>
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
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="board-card-icon light-text"
                    onClick={() =>
                        setIsPopupOpen({
                            type: 'create',
                            entity: 'column',
                            actionTitle: 'Add task',
                            isOpen: true,
                        })
                    }
                />
            </div>
            {column.tasks.length > 0 &&
                column.tasks.map((task) => (
                    <TaskCard key={task._id} task={task} onDragStart={() => handleDragStart(task)} />
                ))}
            {isPopupOpen.isOpen === true && isPopupOpen.entity === 'column' && (
                <EditPopup
                    handleProceed={() => handleCreateTask (column._id, newTaskData)}
                    handleInputChange={handleNewTaskInputChange}
                    handleCancel={handleCancel}
                    data={newTaskData}
                />
            )}
        </div>
    );
};

export default ColumnCard;
