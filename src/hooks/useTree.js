const useTree = () => {
  // InserNode
  const insertNode = (tree, parentId, node) => {
    if (!tree) return tree;

    if (tree.id === parentId) {
      return {
        ...tree,
        children: [...tree.children, node],
      };
    }

    if (tree.children) {
      return {
        ...tree,
        children: tree.children.map((child) => insertNode(child, parentId, node)),
      };
    }

    return tree;
  };

  // deleteNode
  const deleteNode = (tree, nodeId) => {
    if (!tree) return null;

    if (tree.id === nodeId) {
      return null;
    }

    if (tree.children && tree.children.length > 0) {
      const newChildren = tree.children.map((child) => deleteNode(child, nodeId)).filter((child) => child !== null);

      return {
        ...tree,
        children: newChildren,
      };
    }

    return tree;
  };

  // UpdateNode
  const updateNode = (tree, nodeId, newName) => {
    if (!tree) return tree;

    if (tree.id === nodeId) {
      return {
        ...tree,
        name: newName,
      };
    }

    if (tree.children) {
      return {
        ...tree,
        children: tree.children.map((child) => updateNode(child, nodeId, newName)),
      };
    }

    return tree;
  };

  return { insertNode, deleteNode, updateNode };
};

export default useTree;
