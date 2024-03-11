import request from "@/utils/request";

/**
 * 获取壁纸信息分页列表
 * @returns
 */
export function GetWallpaperInfoPageList(params) {
  return request({
    url: "/pc/wallpaper/pageList",
    method: "get",
    params,
  });
}

/**
 * 新增壁纸
 * @param {*} data
 * @returns
 */
export function AddWallpaperInfo(data) {
  return request({
    url: "/pc/wallpaper/addWallpaperInfo",
    method: "post",
    data,
  });
}

/**
 * 修改壁纸
 * @param {*} data
 * @returns
 */
export function UpdateWallpaperInfo(data) {
  return request({
    url: "/pc/wallpaper/updateWallpaperInfo",
    method: "post",
    data,
  });
}

/**
 * 通过主键删除数据
 */
export function DeleteById(params) {
  return request({
    url: "/pc/wallpaper/deleteById",
    method: "delete",
    params,
  });
}
