import { List, Avatar, Icon } from 'antd';

const listData = [];

// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: 'http://ant.design',
//     title: `ant design part ${i}`,
//     description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const BusinessList = (props)  => {
  return(
  <List
    itemLayout="vertical"
    size="small"
    // grid={{ gutter: 0, column: 1 }}
    // pagination={{
    //   onChange: (page) => {
    //     console.log(page);
    //   },
    //   pageSize: 2,
    // }}
    dataSource={props.data}
    // footer={<div><b>ant design</b> footer part</div>}
    renderItem={item => (
      <List.Item
        key={item.id}
        actions={[<IconText type="star-o" text="156" />]}
        extra={<img width={140} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
      >
        <List.Item.Meta
          title={<a> {item.business}</a>}
          // title={<a href={item.href}>{item.title}</a>}
          description={item.date}
        />
        {item.score}
      </List.Item>
    )}
  />
);
};

export default BusinessList;