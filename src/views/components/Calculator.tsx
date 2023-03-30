import React, { useState } from 'react';
import { Typography, Container, Button, Modal, Box} from '@mui/material';
import CalculatorInput, { CalculationDetails } from './CalculatorInput';
import CalculatorGraph from './CalculatorGraph';
import CalculatorItems from './CalculatorItems';



const Calculator = () => {
    const [items, setItems] = useState<CalculationDetails[]>([])
    const handleSelect = (details: CalculationDetails) => {
        setItems([...items, details])
    }

    const handleDelete = (id: number) => {
        setItems(items.filter((item) => item.category.id !== id))
    }

    const handleUpdate = (id: number, updatedItem: CalculationDetails) => {
        let newItems: CalculationDetails[] = []

        for (const element of items) {
            // if item has target id, push the updated item
            if (element.category.id === id) {
                newItems.push(updatedItem)
            } else {
                newItems.push(element)
            }
        }
        setItems(newItems)
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return (
        <Container style={{
            borderRadius: '5px',
            width: 'fit-content'
        }} sx={{padding: 0}}>
            <Typography variant="h3" sx={{ marginBottom: '1rem' }}>UpCycleIT® Calculator</Typography>
            <Container style={{border: '1px dashed #CDE0EC', borderRadius: '4px'}} sx={{padding: 2}} maxWidth="lg" color="text.primary">
                <CalculatorInput onSelect={handleSelect} />
                <CalculatorItems items={items} onDelete={handleDelete} onUpdate={handleUpdate}></CalculatorItems>
                <CalculatorGraph items={items}></CalculatorGraph>
                <Button variant="contained" color="primary" sx={{ marginTop: '1rem' }} onClick={handleOpen}>Contact Us</Button>
                

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Contact Us
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                context
                            </Typography>
                        </Box>
                </Modal>
            </Container>
        </Container>
    );
}

export default Calculator;