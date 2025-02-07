import {Box} from "@mui/material";
import StorageTileObject from "./StorageObject/StorageTileObject.jsx";
import {useStorageContext} from "../../context/Storage/StorageProvider.jsx";
import {motion, AnimatePresence} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import StorageListObject from "./StorageObject/StorageListObject.jsx";
import {SelectableGroup} from "react-selectable-fast";
import Selecto from "react-selecto";
import Moveable from "react-moveable";

export const ObjectsContainer = () => {

    const {folderContent, filesView, turnRegularTiles, turnLargeTiles} = useStorageContext();

    const animationVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
        exit: {opacity: 0}
    };


    const transitionKey = `${folderContent?.map(item => item.id || item.name).join(",")}`;

    const [selectedIds, setSelectedIds] = useState([]);
    const containerRef = useRef(null);
    const moveableRef = useRef(null);
    const selectoRef = useRef(null);

    useEffect(() => {
        if (moveableRef.current) {
            moveableRef.current.updateRect();
        }
    }, [selectedIds]);

    if (filesView === 'regularTiles' || filesView === 'largeTiles') {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={transitionKey}
                    initial="hidden"
                    animate="visible"

                    variants={animationVariants}
                    transition={{duration: 0.2}}
                >


                    <Box
                        ref={containerRef}
                        className={"elements"}
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(' + (filesView === 'largeTiles' ? '160px' : '100px') + ',100%), 1fr))',
                            gap: 1,
                            pb: 5,
                        }}
                    >
                        {folderContent
                            && folderContent
                                .map((item) => <StorageTileObject selectedIds={selectedIds} object={item}
                                                                  style={filesView}/>)}
                    </Box>

                    <Selecto
                        ref={selectoRef}
                        container={containerRef.current}
                        selectableTargets={[".selectable"]}
                        selectByClick={false}
                        selectFromInside={false}
                        toggleContinueSelect={["shift"]}
                        hitRate={1}
                        dragContainer={".elements"}
                        onSelect={
                            (e) => {
                                // 1️⃣ Удаляем класс \.selected\ у всех элементов перед новым выделением
                                document.querySelectorAll(".selectable.selected").forEach(el => {
                                    el.classList.remove("selected");
                                });

                                // 2️⃣ Добавляем класс \.selected\ только выделенным элементам
                                e.selected.forEach(el => el.classList.add("selected"));

                                // 3️⃣ Обновляем \selectedIds\
                                console.log(e.selected.map(el => el.dataset.id))
                                setSelectedIds(e.selected.map(el => el.dataset.id));
                            }

                        }

                        // onDragStart={(e) => {
                        //     const target = e.inputEvent.target;
                        //     if (
                        //         moveableRef.current.isMoveableElement(target) ||
                        //         targets.some((t) => t === target || t.contains(target))
                        //     ) {
                        //         e.stop();
                        //     }
                        // }}


                    />

                    <Moveable
                        ref={moveableRef}
                        target={selectedIds
                            .map(id => document.querySelector(`[data-id="${id}"]`))
                            .filter(el => el !== null)}
                        draggable={true}
                        throttleDrag={0}


                        onRender={(e, clientX, clientY, target) => {
                            console.log("onDragStart", target.dataset.id);
                            console.log("onDrag left, top", clientX, clientY);
                            console.log(e);
                            e.target.style.cssText += e.cssText;
                        }}
                        onRenderGroup={e => {

                            const x = e.events[0].clientX;
                            const y = e.events[0].clientY;
                            const objs = e.events.map(e => e.target.dataset.id);

                            console.log('X: ' + x + ', Y: ' + y + ' -- ' + objs);

                            e.events.forEach((ev) => {
                                // console.log(ev.clientX, ev.clientY);
                                // console.log(ev.target.dataset.id);
                                // ev.target.style.cssText += ev.cssText;
                            });
                        }}
                    />

                </motion.div>
            </AnimatePresence>
        )
    } else {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={transitionKey}
                    initial="hidden"
                    animate="visible"
                    exit="exit"

                    variants={animationVariants}
                    transition={{duration: 0.2}}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gap: 0.8,
                            pb: 5,
                        }}
                    >
                        {folderContent
                            && folderContent
                                .map((item) => <StorageListObject object={item} style={filesView}/>)}
                    </Box>
                </motion.div>
            </AnimatePresence>
        )
    }

}