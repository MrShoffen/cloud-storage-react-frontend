import Selecto from "react-selecto";
import Moveable from "react-moveable";
import {useEffect, useRef, useState} from "react";
import {Button} from "@mui/material";
import {useStorageContext} from "../../../context/Storage/StorageProvider.jsx";
import {isMobile} from "react-device-detect";

export const FileSelection = ({
                                  containerRef,
                                  selectoRef, moveableRef,
                                  selectedIds, setSelectedIds
                              }) => {
    const isMob = isMobile;


    const {goToFolder, isSelectionMode, setSelectionMode} = useStorageContext();

    const [mobileSelecting, setMobileSelecting] = useState(false);

    const [coordinates, setCoordinates] = useState({x: 0, y: 0});

    const handleClick = (event) => {
        if (containerRef.current) {
            const touch = event.touches ? event.touches[0] : event;
            setCoordinates({x: touch.clientX, y: touch.clientY});
        }
    };

    useEffect(() => {
            containerRef.current.addEventListener("touchstart", handleClick);
            if (isMob) {
                if (isSelectionMode) {
                    setMobileSelecting(isSelectionMode);
                } else {
                    selectoRef.current.setSelectedTargets([]);
                }
            }
        },
        [isSelectionMode])

    useEffect(() => {
            if (isMob && mobileSelecting) {

                const elements = document.elementsFromPoint(coordinates.x, coordinates.y);
                const el = elements.find(elem => elem.classList.contains('selectable'));
                // console.log(el);
                // console.log(coordinates);
                const clickEvent = new MouseEvent("mousedown", {
                    bubbles: true, // Событие всплывает
                    cancelable: true,
                    clientX: coordinates.x, // Координата X относительно окна браузера
                    clientY: coordinates.y, // Координата Y относительно окна браузера
                });
                if (el) {
                    el.dispatchEvent(clickEvent)
                }
            }
        }
        ,
        [mobileSelecting]
    )

    const [scrollingAllowed, setScrollingAllowed] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (selectedIds.length === 0) {
                isMob && setMobileSelecting(false);
                setSelectionMode(false);
            }
        }, 100);

    }, [selectedIds])


    return (
        <>

            <Selecto
                ref={selectoRef}


                selectableTargets={[" .selectable"]}
                selectByClick={!isMob ? true : (mobileSelecting)}
                selectFromInside={!isMob ? true : (mobileSelecting)}
                continueSelect={!isMob ? false : (mobileSelecting)}
                toggleContinueSelect={['shift']}
                hitRate={isMob ? 1000 : 0}
                dragContainer={".elements"}


                // onDragStart={(e) => e.stop()}
                onSelect={
                    (e) => {
                        // console.log(e);

                        setSelectedIds([]);

                        console.log(e.selected.map(el => el.dataset.id))
                        setSelectedIds(e.selected.map(el => el.dataset.id));
                    }
                }
                selectionClassName="selecto-selection"
            />

            {/*<Moveable*/}
            {/*    ref={moveableRef}*/}
            {/*    target={selectedIds*/}
            {/*        .map(id => document.querySelector(`[data-id="${id}"]`))*/}
            {/*        .filter(el => el !== null)}*/}
            {/*    draggable={true}*/}


            {/*    onClickGroup={e =>*/}
            {/*        selectoRef.current.clickTarget(e.inputEvent, e.inputTarget)*/}
            {/*    }*/}

            {/*    onRender={(e) => {*/}
            {/*        const x = e.clientX;*/}
            {/*        const y = e.clientY;*/}
            {/*        const objs = e.target.dataset.id;*/}
            {/*        console.log('X: ' + x + ', Y: ' + y + ' -- ' + objs);*/}
            {/*    }}*/}
            {/*    onRenderGroup={e => {*/}

            {/*        const x = e.events[0].clientX;*/}
            {/*        const y = e.events[0].clientY;*/}
            {/*        const objs = e.events.map(e => e.target.dataset.id);*/}

            {/*        console.log('X: ' + x + ', Y: ' + y + ' -- ' + objs);*/}

            {/*        e.events.forEach((ev) => {*/}
            {/*            // console.log(ev.clientX, ev.clientY);*/}
            {/*            // console.log(ev.target.dataset.id);*/}
            {/*            // ev.target.style.cssText += ev.cssText;*/}
            {/*        });*/}
            {/*    }}*/}


            {/*/>*/}
        </>
    )
}