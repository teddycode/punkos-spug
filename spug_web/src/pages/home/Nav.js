/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the AGPL-3.0 License.
 */
import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Col, Row } from 'antd';
import { LeftSquareOutlined, RightSquareOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import NavForm from './NavForm';
import { http } from 'libs';
import styles from './index.module.less';

function NavIndex(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState();

  useEffect(() => {
    fetchRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fetchRecords() {
    http.get('/api/home/navigation/')
      .then(res => setRecords(res))
  }

  function handleSubmit() {
    fetchRecords();
    setRecord(null)
  }

  function handleSort(info, sort) {
    http.patch('/api/home/navigation/', {id: info.id, sort})
      .then(() => fetchRecords())
  }

  return (
    <Card
      title="便捷导航"
      className={styles.nav}
      bodyStyle={{paddingBottom: 0, minHeight: 166}}
      extra={<Button type="link" onClick={() => setIsEdit(!isEdit)}>{isEdit ? '完成' : '编辑'}</Button>}>
      {isEdit ? (
        <Row gutter={24}>
          <Col span={6} style={{marginBottom: 24}}>
            <div
              className={styles.add}
              onClick={() => setRecord({links: [{}]})}>
              <PlusOutlined/>
              <span>新建</span>
            </div>
          </Col>
          {records.map(item => (
            <Col key={item.id} span={6} style={{marginBottom: 24}}>
              <Card actions={[
                <LeftSquareOutlined onClick={() => handleSort(item, 'up')}/>,
                <RightSquareOutlined onClick={() => handleSort(item, 'down')}/>,
                <EditOutlined onClick={() => setRecord(item)}/>
              ]}>
                <Card.Meta
                  avatar={<Avatar src={item.logo}/>}
                  title={item.title}
                  description={item.desc}/>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={24}>
          {records.map(item => (
            <Col key={item.id} span={6} style={{marginBottom: 24}}>
              <Card
                actions={item.links.map(x => <a href={x.url} rel="noopener noreferrer" target="_blank">{x.name}</a>)}>
                <Card.Meta
                  avatar={<Avatar src={item.logo}/>}
                  title={item.title}
                  description={item.desc}/>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {record ? <NavForm record={record} onCancel={() => setRecord(null)} onOk={handleSubmit}/> : null}
    </Card>
  )
}

export default NavIndex