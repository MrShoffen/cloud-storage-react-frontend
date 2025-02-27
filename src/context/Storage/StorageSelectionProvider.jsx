import React, {createContext, useContext, useState} from "react";


const CloudStorageContext = createContext();

export const useStorageSelection = () => useContext(CloudStorageContext);


export const StorageSelectionProvider = ({children}) => {
    const [isSelectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const [isCopyMode, setCopyMode] = useState(false);
    const [isCutMode, setCutMode] = useState(false);

    const [bufferIds, setBufferIds] = useState([]);

    // useEffect(() => {
    //     if(selectedIds.length > 0) {
    //         setSelectionMode(true);
    //     } else {
    //         setSelectionMode(false);
    //     }
    //
    // },[selectedIds])

    const startCopying = () => {
        setBufferIds(selectedIds);
        setCopyMode(true);

        setSelectedIds([]);
        setSelectionMode(false);
    }

    const endCopying = () => {
        setBufferIds([]);
        setCopyMode(false);
    }


    const startCutting = () => {
        setBufferIds(selectedIds);
        setCutMode(true);

        setSelectedIds([]);
        setSelectionMode(false);
    }

    const endCutting = () => {
        setBufferIds([]);
        setCutMode(false);
    }

    return (<CloudStorageContext.Provider
        value={{
            isSelectionMode,
            setSelectionMode,
            selectedIds,
            setSelectedIds,

            isCopyMode,
            bufferIds,
            startCopying,
            endCopying,

            isCutMode,
            startCutting,
            endCutting
        }}>
        {children}
    </CloudStorageContext.Provider>);
}