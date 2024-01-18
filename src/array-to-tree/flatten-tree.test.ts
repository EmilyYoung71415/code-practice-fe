import { flattenTreeNode } from './flatten-tree';

test.skip('arrToTree should work', () => {
  const input = [
    {
      children: [
        {
          children: [
            { children: [{ id: 6, name: 'F', pid: 3 }], id: 3, name: 'C', pid: 1 },
            { children: [{ id: 8, name: 'H', pid: 4 }], id: 4, name: 'D', pid: 1 },
          ],
          id: 1,
          name: 'A',
          pid: 2,
        },
        { id: 5, name: 'E', pid: 2 },
        { id: 7, name: 'G', pid: 2 },
      ],
      id: 2,
      name: 'B',
      pid: 0,
    },
    { id: 9, name: 'I', pid: 0 },
  ];

  const expected = [
    { id: 2, name: 'B', pid: 0 },
    { id: 3, name: 'C', pid: 1 },
    { id: 1, name: 'A', pid: 2 },
    { id: 4, name: 'D', pid: 1 },
    { id: 5, name: 'E', pid: 2 },
    { id: 6, name: 'F', pid: 3 },
    { id: 7, name: 'G', pid: 2 },
    { id: 8, name: 'H', pid: 4 },
    { id: 9, name: 'I', pid: 0 },
  ];
  const result = flattenTreeNode(input);
  // console.log(result);
  // expect(result).toEqual(expected);
});
