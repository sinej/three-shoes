import { useState } from "react";
import '@src/shoes.scss';
import Constants from "@src/Constants.ts";
import { Box, List, ListItem, IconButton, ListItemText, Typography } from "@mui/material";
import {selectedColorState, selectedMeshState} from "@src/atoms/atoms.ts";
import {useRecoilState} from "recoil";

const ColorComponent = () => {
    const [selectedColor, setSelectedColor] = useRecoilState(selectedColorState);
    const [selectedMeshName, setSelectedMeshName] = useRecoilState(selectedMeshState);
    const padding = 16;
    const btnWidth = 30;
    const width = Constants.COLOR_ARR.length * (btnWidth + padding)

    const handleColor = (color: any, idx: number) => {
        console.log("color", color)
        console.log("idx", idx)
        setSelectedColor(idx);
    }

    return (
      <Box className="color-wrap">
        <Box className="color-inner-wrap" style={{width: width}}>
            <Typography className="current-part">
                {selectedMeshName}
            </Typography>

            <List className="list-wrap">
                {
                    Constants.COLOR_ARR.map((color, idx) => (
                        <ListItem className={"color - item"} key={`${color}-${idx}`}>
                            <IconButton onClick={(e) => handleColor(color, idx)}
                                        className={selectedColor === idx ? 'color-btn selected' : ''}
                                        style={{backgroundColor: color.color}}
                            ></IconButton>
                            {
                                selectedColor === idx ?
                                    <ListItemText className="color-name" primary>
                                        {Constants.COLOR_ARR[selectedColor].name}
                                    </ListItemText>:
                                    null
                            }
                        </ListItem>
                    ))
                }
            </List>
        </Box>
      </Box>
     );
}

export default ColorComponent;