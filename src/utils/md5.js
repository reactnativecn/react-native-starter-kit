/**
 * Created by Yun on 2016-12-10.
 */
import md5 from 'md5';
import crypt from 'crypt';

export {
  md5,
};

export function md5b64(data) {
  return crypt.bytesToBase64(md5(data, { asBytes: true }));
}
