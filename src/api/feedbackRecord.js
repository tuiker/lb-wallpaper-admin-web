import request from "@/utils/request";

/**
 * 获取反馈记录分页列表
 * @returns
 */
export function PageList(params) {
  return request({
    url: "/pc/feedback/pageList",
    method: "get",
    params,
  });
}
