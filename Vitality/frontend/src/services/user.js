import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryBusiness() {
  return request ('/api/business');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}
