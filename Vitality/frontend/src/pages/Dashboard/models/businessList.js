  import { queryBusinessList } from '@/services/api';
  import { MessageType as then } from "antd";
  import '@/services/api'

export default {
  namespace: 'activities',

  state: {
    list: [],
  },

  effects: {
    *fetchList(_, { call, put }) {
      const response = yield call(queryBusinessList());
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },



  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
