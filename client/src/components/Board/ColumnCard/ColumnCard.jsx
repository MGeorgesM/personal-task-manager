import Popup from '../../Elements/Popup/Popup';
import TaskCard from './TaskCard/TaskCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useColumnCardLogic } from './logic';

const ColumnCard = ({ column, onDragOver, onDrop, handleDragStart }) => {
    const {
        columnData,
        isPopupOpen,
        newTaskData,
        setIsPopupOpen,
        handleColumnEdit,
        handleCreateTask,
        handleColumnDelete,
        handleColumnInputChange,
        handleNewTaskInputChange,
    } = useColumnCardLogic(column);
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
                    className="board-card-icon light-text add-btn"
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
                    <TaskCard
                        key={task._id}
                        task={task}
                        onDragStart={() => handleDragStart(task)}
                        columnId={column._id}
                    />
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
