import React, {memo} from 'react'
import { Row, Col, Card, Tabs, DatePicker, Button, Drawer } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';

const { TabPane } = Tabs;



const MapCard = memo  (
  ({ }) => (
  <Card bordered = {true} bodyStyle = {{padding: 0}}>
    <Tabs>
      <TabPane>
        <Button type="primary" size={'small'}>Primary</Button>
      </TabPane>
    </Tabs>
  </Card>
  )
);
export default MapCard;