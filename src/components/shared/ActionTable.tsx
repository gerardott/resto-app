import React from 'react';
import { Table, Button } from 'antd';
import BasicTable, { BasicTableProps } from './BasicTable';
import { EditTwoTone, EyeTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { ColumnType } from 'antd/lib/table';

interface ActionTableProps extends BasicTableProps {
  onView?: (record: any, index: number) => void,
  onEdit?: (record: any, index: number) => void,
  onDelete?: (record: any, index: number) => void,
  hasActions?: (record: any, index: number) => boolean,
}

const Link: React.FC<any> = ({ onClick, text }) => (
  <>
    <Button type="link" size="small" style={{ padding: '2px 6px 0 0' }} onClick={onClick}>{text}</Button>
  </>
)

const ActionTable: React.FC<ActionTableProps> = ({ columns, children, onView, onEdit, onDelete, hasActions, ...props }) => {
  const actionsRender = (value: any, record: any, idx: number) => {

    const handleView = () => {
      if (onView) onView(record, idx);
    }
    const handleEdit = () => {
      if (onEdit) onEdit(record, idx);
    }
    const handleDelete = () => {
      if (onDelete) onDelete(record, idx);
    }

    if (!hasActions || (hasActions && hasActions(record, idx))) {
      return (
        <div>
          {onView && (
            <Link onClick={handleView} text={<EyeTwoTone style={{fontSize: '18px'}} />} />
          )}
          {onEdit && (
            <Link onClick={handleEdit} text={<EditTwoTone style={{fontSize: '18px'}} />} />
          )}
          {onDelete && (
            <Link onClick={handleDelete} text={<DeleteTwoTone style={{fontSize: '18px'}} />} />
          )}
        </div>
      );
    }
  }

  if (columns) {
    const actionsColumn: ColumnType<any> = { title: 'Actions', render: actionsRender, width: 100, fixed: 'right' };
    if (columns.every(col => 'children' in col)) {
      columns = [...columns, { title: null, children: [actionsColumn] }]
    }
    else {
      columns = [...columns, actionsColumn];
    }
  }

  const hasChildren = children && true;

  if (hasChildren) {
    return (
      <BasicTable {...props}>
        {children}
        <Table.Column title="Actions" render={actionsRender} width={100} fixed='right' />
      </BasicTable>
    )
  }
  else {
    return (
      <BasicTable {...props} columns={columns}>
      </BasicTable>
    );
  }
};

export default ActionTable;
