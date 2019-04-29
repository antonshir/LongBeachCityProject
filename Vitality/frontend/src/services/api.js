import { stringify } from 'qs';
import request from '@/utils/request';


export async function queryBusiness() {
 return request('http://localhost:8000/api/business/BU20357460/');
}


export async function queryBusinessList(zip) {
  return request(`http://localhost:8000/api/businesslist/?zipcode=${zip}&startindex=0&endindex=10`);
}



export async function zipcoderatio() {
  return request('/api/zipcoderatio/');
}

export async function socialmediascore() {
  return request('/api/socialmediascore/');
}


