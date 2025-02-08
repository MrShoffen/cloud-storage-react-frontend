import Selecto from "react-selecto";
import Moveable from "react-moveable";
import {useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import {useStorageContext} from "../../context/Storage/StorageProvider.jsx";
import {isMobile} from "react-device-detect";
import {ObjectIcon} from "../StorageObjects/elements/ObjectIcon.jsx";

export const FileSelection = ({
                                  containerRef,
                                  selectoRef, moveableRef,
                                  selectedIds, setSelectedIds
                              }) => {
    const isMob = isMobile;


    const {isSelectionMode, setSelectionMode} = useStorageContext();

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
            containerRef.current.addEventListener("mousedown", handleClick);
        },
        [])

    useEffect(() => {
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

    useEffect(() => {
        setTimeout(() => {
            if (selectedIds.length === 0) {
                isMob && setMobileSelecting(false);
                setSelectionMode(false);
            }
        }, 100);

    }, [selectedIds])

    const [iconCoord, setIconCoord] = useState({x: 0, y: 0});
    const iconRef = useRef(null);
    const [showIcon, setShowIcon] = useState(false);

    const shouldSelectFromInside = () => {

        if (selectedIds.length !== 1) {
            return true;
        }

        const elements = document.elementsFromPoint(coordinates.x, coordinates.y);

        const el = elements.find(elem => elem.classList.contains('selectable'));

        if (el) {
            return !selectedIds.includes(el.dataset.id);
        }

    }

    return (
        <>


            <Selecto
                ref={selectoRef}
                selectableTargets={[" .selectable"]}
                selectByClick={!isMob ? true : (mobileSelecting)}
                selectFromInside={!isMob ? shouldSelectFromInside() : (mobileSelecting)}
                continueSelect={!isMob ? false : (mobileSelecting)}
                toggleContinueSelect={['shift']}
                hitRate={isMob ? 1000 : 0}
                dragContainer={".elements"}

                onSelect={
                    (e) => {
                        setSelectedIds([]);
                        console.log(e.selected.map(el => el.dataset.id))
                        setSelectedIds(e.selected.map(el => el.dataset.id));
                    }
                }
                selectionClassName="selecto-selection"
            />

            {
                !isMob &&
                <>
                    <Moveable
                        ref={moveableRef}
                        target={selectedIds
                            .map(id => document.querySelector(`[data-id="${id}"]`))
                            .filter(el => el !== null)}
                        draggable={true}
                        onClickGroup={e =>
                            selectoRef.current.clickTarget(e.inputEvent, e.inputTarget)
                        }

                        onRender={(e) => {
                            setShowIcon(true);

                            const x = e.clientX;
                            const y = e.clientY;
                            setIconCoord({x: x, y: y});

                            const objs = e.target.dataset.id;
                            console.log('X: ' + x + ', Y: ' + y + ' -- ' + objs);
                        }}
                        onRenderGroup={e => {
                            setShowIcon(true);

                            const x = e.events[0].clientX;
                            const y = e.events[0].clientY;
                            const objs = e.events.map(e => e.target.dataset.id);

                            setIconCoord({x: x, y: y});

                            console.log('X: ' + x + ', Y: ' + y + ' -- ' + objs);

                            e.events.forEach((ev) => {
                                // console.log(ev.clientX, ev.clientY);
                                // console.log(ev.target.dataset.id);
                                // ev.target.style.cssText += ev.cssText;
                            });

                        }}


                        onDragGroupEnd={() => setShowIcon(false)}
                        onDragEnd={() => setShowIcon(false)}
                    />
                    <Box
                        ref={iconRef}
                        sx={{
                            position: "fixed",
                            display: showIcon ? "block" : "none",
                            pointerEvents: 'none',
                            width: "100px",
                            height: "100px",
                            backgroundColor: "divider",
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'text.secondary',
                            opacity: 0.85,
                            zIndex: 1000,
                            transform: 'translate(-50%, -80%)',
                            left: iconCoord.x,
                            top: iconCoord.y,
                        }}
                    >


                        {selectedIds.slice(0, 4).map((id, index) => {
                                return <Box
                                    sx={{
                                        position: "absolute",
                                        left: index * 6 - 1 + 'px',
                                        top: index * 6 - 4 + 'px',
                                    }}
                                >
                                    <ObjectIcon name={id}/>
                                </Box>
                            }
                        )}
                        <Box
                            sx={{
                                position: "absolute",
                                left: 23 + (selectedIds.length > 4 ? 4 : selectedIds.length) * 6 + '%',
                                top: 23 + (selectedIds.length > 4 ? 4 : selectedIds.length) * 6 + '%',
                                pl: '5px',
                                pr: '5px',
                                backgroundColor: 'background.paper',
                                userSelect: 'none',
                                border: '1px solid',
                                borderRadius: 1,
                                borderColor: 'text.secondary',
                                color: 'text.secondary',

                            }}
                        >{selectedIds.length}</Box>
                    </Box>
                </>
            }
        </>
    )
}