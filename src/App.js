import React, { useState } from 'react';
import { Table, Button, Space, Input } from 'antd';
import { Box, Flex, Text } from "@chakra-ui/react";


const data = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i,
    customer_id: 10000+i,
    name: `Edward King ${i}`,
    age: 32 + i,
    address: `Park Lane no. ${i}`,
    state: 'Washington',
    zip_code: 98000+i,
    gender: (i%2 !== 0) ? 'Male' : 'Female',
    purchase_date: '08-03-2023',
  });
};



const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]),
        [filteredInfo, setFilteredInfo] = useState({}),
        [sortedInfo, setSortedInfo] = useState({}),
        [filterTable, setFilterTable] = useState();


  const handleSearch = (value) => {
    console.log("PASS", { value });

    const filterTable = data.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };


  const handleChange = (pagination, filters, sorter,filteredValue) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setFilterTable(null);
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customer_id',
      key: 'customer_id',
      sorter: (a, b) => a.customer_id - b.customer_id,
      sortOrder: sortedInfo.columnKey === 'customer_id' ? sortedInfo.order : null,
      ellipsis: true,

    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,

    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state.localeCompare(b.state),
      sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
    },
    {
      title: 'Zip code',
      dataIndex: 'zip_code',
      key: 'zip_code',
      sorter: (a, b) => a.zip_code - b.zip_code,
      sortOrder: sortedInfo.columnKey === 'zip_code' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortOrder: sortedInfo.columnKey === 'gender' ? sortedInfo.order : null,
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchase_date',
      key: 'purchase_date',
      sorter: (a, b) => a.purchase_date - b.purchase_date,
      sortOrder: sortedInfo.columnKey === 'purchase_date' ? sortedInfo.order : null,
    },
  ];


  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };





  return (
    <Box m="20" boxShadow="xl" rounded="md" p="10">
      <Flex align="center" mb={4}>
        <Text fontSize="md" fontWeight="medium" mr={2}>
           <h1>Hello, Steve!</h1>
        </Text>
        </Flex>
        <Text
        fontSize="xl"
        fontWeight="bold"
        m={6}
        borderBottom="solid 3px #1da1f2"
      >
        Reports
      </Text>

    <Input.Search placeholder="Search"
                  style={{
                    marginBottom: 8,
                    width: 200
                  }}
                  enterButton
                  onSearch={handleSearch}
                  onChange={(e) => handleSearch(e.target.value)}
    />
    <Space
      style={{
        marginBottom: 16,
      }}
    >
      <Button onClick={clearAll}>Clear filters and sorters</Button>
    </Space>
    <Table rowSelection={rowSelection}
           columns={columns}
           dataSource={filterTable == null ? data : filterTable}
           onChange={handleChange}
           />

    </Box>
    );
};
export default App;
