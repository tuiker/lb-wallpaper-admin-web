import request from "@/utils/request";

/**
 * 获取壁纸分类分页列表
 * @returns
 */
export function GetCategoryPageList(params) {
  return request({
    url: "/pc/category/pageList",
    method: "get",
    params,
  });
}

/**
 * 新增分类
 * @param {*} data
 * @returns
 */
export function AddCategory(data) {
  return request({
    url: "/pc/category/addCategory",
    method: "post",
    data,
  });
}

/**
 * 修改分类
 * @param {*} data
 * @returns
 */
export function UpdateCategory(data) {
  return request({
    url: "/pc/category/updateCategory",
    method: "post",
    data,
  });
}

/**
 * 通过主键删除数据
 */
export function DeleteById(params) {
  return request({
    url: "/pc/category/deleteById",
    method: "delete",
    params,
  });
}
