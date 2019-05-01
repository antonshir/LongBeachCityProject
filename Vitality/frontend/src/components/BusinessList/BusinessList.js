import { List, Avatar, Icon } from 'antd';
import { Link } from "react-router-dom";
import logo from '../../assets/yelp.png'
import defaultImage from "../../assets/no_image.png"

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
 
  console.log(props.data);
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
    renderItem={item => (
      <List.Item
        key={item.id}
        actions={[<Icon type="frown" theme="twoTone" width = '3em' height = '3em' style = {{color: '#ff0000'}} text={item.score} />]}
        extra={<img width={140} src={item.business.yelp == null? defaultImage : item.business.yelp.image_url} />}
      >
        <List.Item.Meta
          title={<Link to= {{
            pathname: '/dashboard/advancedprofile',
          state: {
            licenseNum: item.business.license_num
          }
          }}>
            {item.business.dba_name === ""? item.business.name : item.business.dba_name}
          </Link>
          }

          description={<b>Category: {item.business.business_type}</b>}
        />
        {/*{item.score}*/}
        {item.status}
      </List.Item>
    )}
  />
);
};

export default BusinessList;