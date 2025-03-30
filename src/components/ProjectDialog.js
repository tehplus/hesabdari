import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box
} from '@mui/material';

function ProjectDialog({ open, handleClose, onSave }) {
  const [projectData, setProjectData] = useState({
    name: '',
    image: '',
    isDefault: false
  });

  const handleSave = () => {
    onSave(projectData);
    handleClose();
    setProjectData({ name: '', image: '', isDefault: false });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>افزودن پروژه جدید</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400, pt: 2 }}>
          <TextField
            label="نام پروژه"
            value={projectData.name}
            onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="آدرس تصویر"
            value={projectData.image}
            onChange={(e) => setProjectData({ ...projectData, image: e.target.value })}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={projectData.isDefault}
                onChange={(e) => setProjectData({ ...projectData, isDefault: e.target.checked })}
              />
            }
            label="پیش‌فرض"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>انصراف</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDialog;