import BoardCard from './BoardCard/BoardCard';
import Popup from '../Elements/Popup/Popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import { useBoardsLogic } from './logic';

const Boards = () => {
    const { boards, handleCreateBoard, handleInputChange, setIsPopupOpen, isPopupOpen, newBoardData } =
        useBoardsLogic();

    return (
        <div className="boards-container expand">
            <div className="boards-header flex space-between">
                <h1 className="size-xl bold">Your Boards</h1>
            </div>
            <div className="boards-main flex">
                {boards.length > 0 ? (
                    boards.map((board) => <BoardCard key={board._id} board={board} />)
                ) : (
                    <p className="size-l bold">No boards yet</p>
                )}
            </div>
            {isPopupOpen.isOpen === true && isPopupOpen.type === 'create' && (
                <Popup
                    handleProceed={handleCreateBoard}
                    handleInputChange={handleInputChange}
                    handleCancel={() => setIsPopupOpen({ ...isPopupOpen, isOpen: false })}
                    isPopupOpen={isPopupOpen}
                    data={newBoardData}
                />
            )}
            <FontAwesomeIcon
                icon={faPlusCircle}
                className="add-btn float-bottom-right primary-text scale box-shadow"
                onClick={() =>
                    setIsPopupOpen({
                        type: 'create',
                        entity: 'board',
                        actionTitle: 'Create new board',
                        isOpen: true,
                    })
                }
            />
        </div>
    );
};

export default Boards;
