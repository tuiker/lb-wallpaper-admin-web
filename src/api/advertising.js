import request from "@/utils/request";

/**
 * 获取广告信息分页列表
 * @returns
 */
export function PageList(params) {
  return request({
    url: "/pc/adv/pageList",
    method: "get",
    params,
  });
}

/**
 * 新增广告
 * @param {*} data
 * @returns
 */
export function AddAdv(data) {
  return request({
    url: "/pc/adv/addAdv",
    method: "post",
    data,
  });
}

/**
 * 修改广告
 * @param {*} data
 * @returns
 */
export function UpdateAdv(data) {
  return request({
    url: "/pc/adv/updateAdv",
    method: "post",
    data,
  });
}

/**
 * 通过主键删除数据
 */
export function DeleteById(params) {
  return request({
    url: "/pc/adv/deleteById",
    method: "delete",
    params,
  });
}
