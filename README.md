Balanced Binary Search Tree (BST)

This project is a Balanced Binary Search Tree (BST) built with JavaScript. It has a Tree class that keeps itself balanced, ensuring fast operations.
Features

    Node Class: A simple building block for the tree; holds data and links to its left/right children.

    Tree Class: Manages the whole tree from its root.

    buildTree(array): Creates a balanced BST from a list of numbers. It sorts the numbers and removes duplicates automatically.

    insert(value): Adds a new number to the tree (no duplicates allowed).

    deleteItem(value): Removes a number, handling cases where a node has no, one, or two children.

    find(value): Finds and returns the node with a specific number.

    Traversal Methods: Ways to visit every node:

        levelOrder(callback): Visits nodes level by level (breadth-first).

        inOrder(callback): Visits nodes in sorted order (left, root, right).

        preOrder(callback): Visits nodes starting from the root (root, left, right).

        postOrder(callback): Visits nodes after their children (left, right, root).
        (All these need a function (callback) to tell them what to do with each node they visit.)

    height(value): Tells you how tall a node is (longest path from that node to a leaf).

    depth(value): Tells you how deep a node is (path length from the root to that node).

    isBalanced(): Checks if the entire tree is balanced (meaning no part of the tree is much taller than another).

    rebalance(): Fixes an unbalanced tree to make it balanced again.

    prettyPrint(node): A handy tool to draw the tree structure in your console.
