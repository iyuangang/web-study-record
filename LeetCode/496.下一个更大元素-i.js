/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 看了题解用单调栈的方法，我觉得暴力法简直弱爆了
const nextGreaterElement = (nums1, nums2) => {
  const stack = [], res = [];
  const hashMap = new Map();
  for (let i = 0; i < nums2.length; i++) {
    while(stack.length !== 0 && stack[0] < nums2[i]) {
      hashMap.set(stack.shift(), nums2[i]);
    }
    stack.unshift(nums2[i]);
  };
  for (let i = 0; i < nums1.length; i++) {
    if(hashMap.has(nums1[i])) {
      res.push(hashMap.get(nums1[i]));
    }else {
      res.push(-1);
    }
  };
  return res;
};

// @lc code=end

// 感觉自己就暴力法了
const nextGreaterElement = (nums1, nums2) => {
  const hashMap = new Map();
  for (let i = 0; i < nums2.length; i++) {
    hashMap.set(nums2[i], i);
  };
  const res = [];
  for (let i = 0; i < nums1.length; i++) {
    let flag = true;
    for (let j = hashMap.get(nums1[i]) + 1; j < nums2.length; j++) {
      if(nums2[j] > nums1[i]) {
        res.push(nums2[j]);
        flag = false;
        break;
      }
    };
    if(flag) res.push(-1);
  };
  return res;
};
// Accepted
// 17/17 cases passed (80 ms)
// Your runtime beats 96.88 % of javascript submissions
// Your memory usage beats 39.34 % of javascript submissions (39.7 MB)

