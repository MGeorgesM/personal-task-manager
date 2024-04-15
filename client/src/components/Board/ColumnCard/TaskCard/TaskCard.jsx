import Popup from '../../../Elements/Popup/Popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useTaskCardLogic } from './logic';

const TaskCard = ({ task, columnId, onDragStart }) => {
    const {
        isHovered,
        taskData,
        setIsPopupOpen,
        setIsHovered,
        isPopupOpen,
        handleEdit,
        handleTaskInputsChange,
        handleTaskDelete,
    } = useTaskCardLogic();

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
