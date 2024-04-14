import React, { useState } from 'react';

import { updateTask, deleteTask, deleteColumn, updateColumn, addTask } from '../../../store/SelectedBoard';
import { useDispatch } from 'react-redux';
import { sendRequest, requestMethods } from '../../../core/tools/apiRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Popup from '../../Elements/Popup/Popup';
import TaskCard from './TaskCard/TaskCard';

const ColumnCard = ({ column, onDragOver, onDrop, handleDragStart }) => {
    const [columnData, setColumnData] = useState({ title: '' });
    const [newTaskData, setNewTaskData] = useState({ title: '', description: '' });
    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
    });

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

    // const TaskCard = ({ task, onDragStart }) => {
    //     const [taskData, setTaskData] = useState({ title: task.title, description: task.description });
    //     const [isHovered, setIsHovered] = useState(false);

    //     const handleTaskInputsChange = (e) => {
    //         setTaskData({ ...taskData, [e.target.name]: e.target.value });
    //     };

    //     return (
    //         <>
    //             <div
    //                 className="padding-m task-card"
    //                 draggable="true"
    //                 onDragStart={(e) => onDragStart(e)}
    //                 onMouseEnter={() => setIsHovered(true)}
    //                 onMouseLeave={() => setIsHovered(false)}
    //             >
    //                 <p className="size-m boder">{taskData.title}</p>
    //                 <p className="size-m boder light-text">{taskData.description}</p>
    //                 {isHovered && (
    //                     <FontAwesomeIcon
    //                         icon={faEdit}
    //                         className="board-card-icon light-text"
    //                         onClick={() =>
    //                             setIsPopupOpen({
    //                                 type: 'edit',
    //                                 entity: 'task',
    //                                 actionTitle: 'Edit task',
    //                                 isOpen: true,
    //                             })
    //                         }
    //                     />
    //                 )}
    //             </div>
    //             {isPopupOpen.isOpen === true && isPopupOpen.entity === 'task' && isPopupOpen.type === 'edit' && (
    //                 <Popup
    //                     handleProceed={() => handleTaskEdit(column._id, task._id, taskData)}
    //                     handleInputChange={handleTaskInputsChange}
    //                     handleCancel={handleCancel}
    //                     handleDelete={() => handleTaskDelete(column._id, task._id)}
    //                     data={taskData}
    //                 />
    //             )}
    //         </>
    //     );
    // };

    return (
        <div
            className="board-overview-column-card light-gray-bg border border-radius-m box-shadow"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, column._id)}
        >
            <div className="column-header padding-m border-btm bold">
                <p
                    className="size-l"
                    onClick={() =>
                        setIsPopupOpen({
                            type: 'edit',
                            entity: 'column',
                            actionTitle: 'Edit column',
                            isOpen: true,
                        })
                    }
                >
                    {column.title}
                </p>
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="board-card-icon light-text"
                    onClick={() =>
                        setIsPopupOpen({
                            type: 'create',
                            entity: 'task',
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
            {isPopupOpen.isOpen === true && isPopupOpen.entity === 'task' && isPopupOpen.type === 'create' && (
                <Popup
                    handleProceed={() => handleCreateTask(column._id, newTaskData)}
                    handleInputChange={handleNewTaskInputChange}
                    handleCancel={handleCancel}
                    isPopupOpen={isPopupOpen}
                    data={newTaskData}
                />
            )}
            {isPopupOpen.isOpen === true && isPopupOpen.entity === 'column' && isPopupOpen.type === 'edit' && (
                <Popup
                    handleProceed={() => handleColumnEdit(column._id, columnData)}
                    handleInputChange={handleColumnInputChange}
                    handleCancel={handleCancel}
                    handleDelete={handleColumnDelete}
                    isPopupOpen={isPopupOpen}
                    data={columnData}
                />
            )}
        </div>
    );
};

export default ColumnCard;
