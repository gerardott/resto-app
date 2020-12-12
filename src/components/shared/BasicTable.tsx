import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';

export interface BasicTableProps extends TableProps<any> {
}

const BasicTable: React.FC<BasicTableProps> = ({ columns, dataSource, children, ...props }) => {
  const rowKey = props.rowKey || 'id';
  const size = props.size || 'small';
  const bordered = (props.bordered === undefined) ? true : props.bordered;

  return (
    <Table
      {...props}
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      size={size}
      bordered={bordered}
    >
      {children}
    </Table>
  );
};

export default BasicTable;
