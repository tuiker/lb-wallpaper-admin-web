import request from '@/utils/request'


/**
 *
 * @param {*} params
 * @returns 文件上传
 */
export function UploadImg(params) {
  return request({
    url: '/comm/fileUpload/uploadFile',
    method: 'post',
    data: params
  })
}










