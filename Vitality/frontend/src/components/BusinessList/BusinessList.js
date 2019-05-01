import { List, Avatar, Icon, Tag, Progress } from 'antd';
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
function me (score) {
  console.log(score);
  if (score == 0){
    return "#f50"
  }
  else if(score == 1){
    return "#FFBE03"
  }
  else if(score == 2) {
    return "#87d068"
  }
}
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
          actions={[<Tag color={me(item.score)}> {item.score} </Tag>]}
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