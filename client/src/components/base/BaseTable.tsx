import { Table } from 'antd';
import * as React from 'react';

interface IBaseTable {
    columns: any[],
    data: any[]
}

const BaseTable: React.FC<IBaseTable> = ({ columns, data }) => {

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: 1950, y: 500 }}
        />
    );
};

export default BaseTable;
