/**
 * Created by tdzl2003 on 6/18/16.
 */

import { AsyncStorage } from 'react-native';
import { EventEmitter } from 'fbemitter';
import URI from 'urijs';
import { observable } from 'mobx';

class ResponseError extends Error {
  constructor(message, code, origin) {
    super(message);
    this.code = code;
    this.origin = origin;
  }
}

const RPC = new EventEmitter();
const emit = RPC.emit.bind(RPC);
export default RPC;

const KEY_TOKEN = 'accessToken';
const ROOT_URL = 'http://your.server.address/';
const UPLOAD_TOKEN_URL = 'upload';

const token = observable(null);

export function getToken() {
  return token.get();
}

export function saveToken(_token) {
  token.set(_token);
  return AsyncStorage.setItem(KEY_TOKEN, token);
}

export async function loadToken() {
  token.set(await AsyncStorage.getItem(KEY_TOKEN));
  return token.get();
}

export async function clearToken() {
  await AsyncStorage.removeItem(KEY_TOKEN);
  token.set(null);
}

async function request(url, _options) {
  const uri = new URI(ROOT_URL + url);

  const options = _options || {};
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (token) {
    options.headers['x-accesstoken'] = token.get();
  }

  if (__DEV__) {
    console.log(`${options.method} ${uri}`);
    if (options.body) {
      console.log(options.body);
    }
  }

  const resp = await fetch(uri.toString(), options);
  const text = await resp.text();
  console.log('RESP:', text);
  const json = JSON.parse(text);

  // 如果请求失败
  if (resp.status !== 200) {
    if (resp.status === 401) {
      // HTTP 401 表示授权验证失败(通常是token已过期)
      emit('invalidToken');
      token.set(null);
    }

    throw new ResponseError(json.message, resp.status, json);
  }

  return json;
}

// file: {uri}
export async function upload(file) {
  const uploadData = await request(new URI(ROOT_URL + UPLOAD_TOKEN_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = new FormData();
  body.append('token', uploadData.formData.token);
  body.append('accept', uploadData.formData.accept);
  body.append('file', {
    uri: file.uri,
    type: file.type || 'image/jpeg',
    name: uploadData.fieldName,
  });

  const options = {
    method: 'POST',
    headers: {},
    body,
  };

  const resp = await fetch(uploadData.url, options);
  const text = await resp.text();
  console.log('RESP:', text);
  const json = JSON.parse(text);

  // 如果请求失败
  if (resp.status !== 200) {
    throw new ResponseError(json.message, resp.status, json);
  }

  return json.result;
}

export function get(url, options) {
  return request(url, options);
}

export function post(url, data, options) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}

export function put(url, data, options) {
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}

export function $delete(url, data, options) {
  return request(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}
