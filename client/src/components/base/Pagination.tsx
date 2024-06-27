import React from 'react';
import { Pagination } from 'antd';
import Typography from '@/components/base/Typography';
import { useTranslation } from 'react-i18next';

type paginationPropsTypes = {
    total: number,
    currentPage: number,
    pageSize: number,
    handleChangePage: (page: number, pageSize: number) => void;
}

const BasePagination: React.FC<paginationPropsTypes> = (props) => {
    const {
        total,
        currentPage,
        pageSize,
        handleChangePage
    } = props;

    const { t } = useTranslation();

    const getFirstIndexOfList = () => {
        let result = 0 + (currentPage - 1) * pageSize + 1;
        if (result > total) result = total;
        return result;
    };

    const getLastIndexOfList = () => {
        let result = (pageSize - 1) + (currentPage - 1) * pageSize + 1;
        if (result > total) result = total;
        return result;
    };


    return (
        <div className={'flex items-center'}>
            <Typography
                    content={t('pagination.show_total', { start: getFirstIndexOfList(), end: getLastIndexOfList(), total: total })}
                    needTranslate={true}
                    className={'text-base'}
                />
            <Pagination
                total={total}
                defaultPageSize={10}
                pageSize={pageSize}
                defaultCurrent={1}
                current={currentPage}
                onChange={handleChangePage}
                className={'flex items-center'}
            />
        </div>

    );
};

export default BasePagination;
