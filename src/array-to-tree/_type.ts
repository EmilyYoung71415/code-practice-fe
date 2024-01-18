export type Node = {
  id: number;
  name: string;
  pid: number;
};

export type TreeNode = Node & {
  children?: TreeNode[];
};
