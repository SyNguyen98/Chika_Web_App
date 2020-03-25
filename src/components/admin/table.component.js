import React, { Component } from 'react';
import { Table, Icon, Input, Button } from 'antd';

import '../../styles/admin/table.component.css'

export default class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchText: '',
          searchedColumn: ''
        }
    }
  
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input ref={node => {this.searchInput = node;}}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}/>
          <Button type="primary" icon="search"
                  onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                  size="small" style={{ width: 90, marginRight: 8 }}>
            Tìm
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)}
                  size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined, fontSize: 15 }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString()
                        .toLowerCase()
                        .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
  
    render() {
        const columns = [];
        this.props.columns.forEach(element => {
          if(element.title === undefined) {
            columns.push({
              title: element.title,
              dataIndex: element.key,
              key: element.key,
              render: element.render,
            })
          } else {
            columns.push({
              title: element.title,
              dataIndex: element.key,
              key: element.key,
              render: element.render,
              ...this.getColumnSearchProps(element.key),
            })
          }
        });
        return(
            <Table  className="admin__table"
                    columns={columns}
                    dataSource={this.props.list}
                    pagination={{ pageSize: 20 }}
                    bordered/>
      )
    }
}