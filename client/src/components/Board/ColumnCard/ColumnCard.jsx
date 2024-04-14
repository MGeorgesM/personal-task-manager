import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { deleteColumn, updateColumn, addTask } from '../../../store/SelectedBoard';

import Popup from '../../Elements/Popup/Popup';
import TaskCard from './TaskCard/TaskCard';

import { sendRequest, requestMethods } from '../../../core/tools/apiRequest';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ColumnCard = ({ column, onDragOver, onDrop, handleDragStart }) => {
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
                    handleCancel={() => setIsPopupOpen({ ...isPopupOpen, isOpen: false })}
                    isPopupOpen={isPopupOpen}
                    data={newTaskData}
                />
            )}
            {isPopupOpen.isOpen === true && isPopupOpen.entity === 'column' && isPopupOpen.type === 'edit' && (
                <Popup
                    handleProceed={() => handleColumnEdit(column._id, columnData)}
                    handleInputChange={handleColumnInputChange}
                    handleCancel={() => setIsPopupOpen({ ...isPopupOpen, isOpen: false })}
                    handleDelete={handleColumnDelete}
                    isPopupOpen={isPopupOpen}
                    data={columnData}
                />
            )}
        </div>
    );
};

export default ColumnCard;
