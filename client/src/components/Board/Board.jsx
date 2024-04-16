import { useBoardLogic } from './logic';

import ColumnCard from './ColumnCard/ColumnCard';
import Popup from '../Elements/Popup/Popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './index.css';

const Board = () => {
    const {
        isPopupOpen,
        selectedBoard,
        newColumnData,
        handleDrop,
        setIsPopupOpen,
        handleDragOver,
        handleDragStart,
        handleCreateColumn,
        handleCreateColumnCancel,
        handleCreateColumnInputChange,
    } = useBoardLogic();

    if (selectedBoard)
        return (
            <>
                <div className="board-overview-container expand">
                    <div className="board-overview-main">
                        <div className="board-overview-header flex column center">
                            <p className="size-xl bold">{selectedBoard.title}</p>
                            <p className="size-m">{selectedBoard.description}</p>
                        </div>
                        <div className="board-overview-columns flex">
                            {selectedBoard.columns.length > 0 ? (
                                selectedBoard.columns.map((column) => (
                                    <ColumnCard
                                        key={column._id}
                                        column={column}
                                        onDragOver={(e) => handleDragOver(column._id, e)}
                                        onDrop={(e) => handleDrop(column._id, e)}
                                        handleDragStart={handleDragStart}
                                    />
                                ))
                            ) : (
                                <p className="size-l bold">No columns yet</p>
                            )}
                        </div>
                    </div>
                </div>
                {isPopupOpen.isOpen === true && isPopupOpen.entity === 'column' && (
                    <Popup
                        handleProceed={handleCreateColumn}
                        handleInputChange={handleCreateColumnInputChange}
                        handleCancel={handleCreateColumnCancel}
                        isPopupOpen={isPopupOpen}
                        data={newColumnData}
                    />
                )}
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="add-btn float-bottom-right primary-text scale box-shadow"
                    onClick={() =>
                        setIsPopupOpen({
                            type: 'create',
                            entity: 'column',
                            actionTitle: 'Add column',
                            isOpen: true,
                        })
                    }
                />
            </>
        );
};

export default Board;
