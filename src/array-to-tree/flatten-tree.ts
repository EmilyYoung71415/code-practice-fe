// 树结构扁平化
import type { TreeNode, Node } from './_type';

export function flattenTreeNode(treeArr: TreeNode[]) {
  // return data.reduce((arr, { children = [], ...rest }) => {
  //   return arr.concat([rest], flatten(children));
  // }, []);

  let newArr: Node[] = [];

  for (let treeNode of treeArr) {
    if (treeNode.children && Array.isArray(treeNode.children)) {
      newArr = newArr.concat(flattenTreeNode(treeNode.children));
    } else {
      const node: Node = {
        id: treeNode.id,
        name: treeNode.name,
        pid: treeNode.pid,
      };
      newArr.push(node);
    }
  }

  return newArr;
}
