// tree生成Array
// Menu菜单 array 和 tree 互转

// 扁平数据转树结构
/**
 * const arr = [
 *  { id: 2, name: 'B', pid: 0 },
 *  { id: 3, name: 'C', pid: 1 },
 *  { id: 1, name: 'A', pid: 2 },
 *  { id: 4, name: 'D', pid: 1 },
 *  { id: 5, name: 'E', pid: 2 },
 *  { id: 6, name: 'F', pid: 3 },
 *  { id: 7, name: 'G', pid: 2 },
 *  { id: 8, name: 'H', pid: 4 },
 *  { id: 9, name: 'I', pid: 0 }
 * ];
 * */

// return:
//     9     7    3 -- 6
//    /     /    /
//   0 -- 2 -- 1 -- 4 -- 8
//         \
//
import type { TreeNode, Node } from './_type';

export function arrToTree(nodes: Node[]) {
  const result: TreeNode[] = [];
  const nodeMap: Map<number, TreeNode> = new Map();

  nodes.forEach(node => {
    nodeMap.set(node.id, node);
  });

  nodes.forEach(node => {
    const pNode = nodeMap.get(node.pid); //obj[node.pid];
    if (pNode) {
      if (!pNode.children) {
        pNode.children = [];
      }
      pNode.children.push(node);
    } else {
      result.push(node);
    }
  });

  return result;
}
