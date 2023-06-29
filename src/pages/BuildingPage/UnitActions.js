import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green, grey } from '@mui/material/colors';
import { updateUnit } from '../../actions/Actions';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material';
import { tokens } from "../../theme";
import axios from 'axios'

const UnitActions = ({ params, rowId, setRowId, buildingId, setRefreshUnits }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = async () => {  
    setLoading(true);

    console.log(params.row);
    
    const result = await updateUnit( params.row );
    
  
    setTimeout(() => {
      setSuccess(true);
      setRowId(null);
      setLoading(false);
    },1000)
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}

      <DeleteIcon 
        sx={{
          position: 'absolute', 
          top: '50%', 
          transform: 'translateY(-50%)',
          '&:hover': { color: 'red' }}}
        onClick={() => {
          axios.delete(`http://localhost:3001/buildings/${buildingId}/units/${params.row._id}`);
          setRefreshUnits(r => true)   
        }} 
      />
    </Box>
  );
};

export default UnitActions;
