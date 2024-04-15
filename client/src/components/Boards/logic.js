import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { setBoards } from '../../store/Boards';

export const useBoardsLogic = () => {
    const [newBoardData, setNewBoardData] = useState({
        title: '',
        description: '',
    });

    const [isPopupOpen, setIsPopupOpen] = useState({
        type: '',
        entity: '',
        actionTitle: '',
        isOpen: false,
    });

    const boards = useSelector((global) => global.boardsSlice.boards);
    const dispatch = useDispatch();

    useEffect(() => {
        const getBoards = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/boards', null);
                if (response.status !== 200) throw new Error();
                console.log(response.data);
                dispatch(setBoards(response.data));
            } catch (error) {
                console.log(error);
            }
        };

        getBoards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e) => {
        setNewBoardData({ ...newBoardData, [e.target.name]: e.target.value });
    };

    const handleCreateBoard = async () => {
        try {
            const response = await sendRequest(requestMethods.POST, '/boards', newBoardData);
            if (response.status !== 201) throw new Error();
            dispatch(setBoards(response.data.boards));
            setIsPopupOpen({ ...isPopupOpen, isOpen: false });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        boards,
        isPopupOpen,
        newBoardData,
        setIsPopupOpen,
        handleCreateBoard,
        handleInputChange,
    };
};
