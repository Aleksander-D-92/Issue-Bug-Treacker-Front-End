import React from "react";
import {Table} from "antd";

interface Idata {
    key: string,
    name: string,
    chinese: number,
    math: number,
    english: number,
}

function SortingTable() {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
        },
    ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            sorter: {
                compare: (a: Idata, b: Idata) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Math Score',
            dataIndex: 'math',
            sorter: {
                compare: (a: Idata, b: Idata) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'English Score',
            dataIndex: 'english',
            sorter: {
                compare: (a: Idata, b: Idata) => a.english - b.english,
                multiple: 1,
            },
        },
    ];

    function onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log(pagination);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(filters);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(sorter);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(extra);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$");
    }

    return (
        <Table columns={columns} dataSource={data} onChange={onChange}/>
    )
}

export {SortingTable}

