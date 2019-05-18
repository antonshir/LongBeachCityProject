//When request return an exception, catch that error and return a message.
//To notify the user if there was an error with a request.
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task.',
  204: 'The data was deleted successfully.',
  400: 'The request was made with an error, and the server did not perform operations to create or modify data.。',
  401: 'User does not have permission (token, username or password is wrong)',
  403: 'User is authorized, but access is forbidden。',
  404: 'The request is made for a record that does not exist, and the server does not operate.。',
  406: 'The format of the request is not available。',
  410: 'The requested resource is permanently deleted and will not be retrieved.。',
  422: 'A validation error occurred when creating an object。',
  500: 'Server error, please check the server.',
  502: 'Gateway error.',
  503: 'Service is unavailable, server is temporarily overloaded or maintained.',
  504: 'Gateway timeout',
};


const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  notification.error({
    message: `Request Error ${status}: ${url}`,
    description: errortext,
  });
};


const request = extend({
  errorHandler,
  WithCredentials: 'TRUE',
  // credentials: 'include',
});

export default request;
