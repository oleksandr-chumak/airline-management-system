import { ICellRendererParams } from 'ag-grid-community';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonCellRendererProps extends ICellRendererParams {
  onDelete: (id: number) => void;
  idField: string;
  isDeleting?: boolean;
}

export function DeleteButtonCellRenderer(props: DeleteButtonCellRendererProps) {
  const { data, onDelete, idField, isDeleting } = props;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data && data[idField]) {
      onDelete(data[idField]);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Tooltip title="Delete">
        <span>
          <IconButton
            color="error"
            size="small"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}