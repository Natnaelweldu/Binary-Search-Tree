// Node class for the Binary Search Tree
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Tree class for the Binary Search Tree
class Tree {
  constructor(array) {
    // Sort, remove duplicates, and build the tree from the array
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedUniqueArray);
  }

  // Helper function to build a balanced BST from a sorted array
  buildTree(array, start = 0, end = array.length - 1) {
    // Base case: if start index is greater than end index, return null
    if (start > end) {
      return null;
    }

    // Calculate the middle index
    const mid = Math.floor((start + end) / 2);
    // Create a new node with the middle element as data
    const node = new Node(array[mid]);

    // Recursively build the left and right subtrees
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  // Inserts a new value into the BST
  insert(value, node = this.root) {
    // If the tree is empty, the new node becomes the root
    if (node === null) {
      this.root = new Node(value);
      return this.root;
    }

    // If the value already exists, do not insert duplicates
    if (value === node.data) {
      console.log(`Value ${value} already exists. Not inserting duplicate.`);
      return node;
    }

    // Traverse left if the value is smaller
    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value);
        return node.left;
      }
      return this.insert(value, node.left);
    }
    // Traverse right if the value is larger
    else {
      if (node.right === null) {
        node.right = new Node(value);
        return node.right;
      }
      return this.insert(value, node.right);
    }
  }

  // Deletes a value from the BST
  deleteItem(value, node = this.root) {
    // Base case: if the node is null, the value is not found
    if (node === null) {
      return node;
    }

    // Traverse left if the value is smaller
    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
      return node;
    }
    // Traverse right if the value is larger
    else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
      return node;
    }
    // Value found (value === node.data)
    else {
      // Case 1: Node has no children or one child
      if (node.left === null) {
        return node.right; // Replace node with its right child (or null if no child)
      } else if (node.right === null) {
        return node.left; // Replace node with its left child
      }

      // Case 2: Node has two children
      // Find the in-order successor (smallest in the right subtree)
      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }

      // Replace the current node's data with the successor's data
      node.data = successor.data;

      // Delete the in-order successor from the right subtree
      node.right = this.deleteItem(successor.data, node.right);
      return node;
    }
  }

  // Finds a node with the given value
  find(value, node = this.root) {
    // Base case: if node is null or data matches, return the node
    if (node === null || node.data === value) {
      return node;
    }

    // Traverse left or right based on the value
    if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  // Traverses the tree in breadth-first level order
  levelOrder(callback) {
    if (!callback || typeof callback !== "function") {
      throw new Error(
        "Callback function is required for levelOrder traversal."
      );
    }

    if (this.root === null) {
      return;
    }

    const queue = [this.root];
    const result = []; // To store results if no callback is used or for internal use

    while (queue.length > 0) {
      const node = queue.shift(); // Dequeue the front node
      callback(node); // Call the callback function with the node
      result.push(node.data); // Store data for a potential return array

      // Enqueue left child if it exists
      if (node.left !== null) {
        queue.push(node.left);
      }
      // Enqueue right child if it exists
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    // For convenience, uncomment if you want to return an array of node data
    // return result;
  }

  // Traverses the tree in in-order (left, root, right)
  inOrder(callback, node = this.root) {
    if (!callback || typeof callback !== "function") {
      throw new Error("Callback function is required for inOrder traversal.");
    }
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  // Traverses the tree in pre-order (root, left, right)
  preOrder(callback, node = this.root) {
    if (!callback || typeof callback !== "function") {
      throw new Error("Callback function is required for preOrder traversal.");
    }
    if (node === null) {
      return;
    }
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  // Traverses the tree in post-order (left, right, root)
  postOrder(callback, node = this.root) {
    if (!callback || typeof callback !== "function") {
      throw new Error("Callback function is required for postOrder traversal.");
    }
    if (node === null) {
      return;
    }
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  // Helper function to calculate the height of a given node
  // Height is the number of edges in the longest path from the node to a leaf node.
  _getHeight(node) {
    if (node === null) {
      return -1; // Height of a null node is -1
    }
    const leftHeight = this._getHeight(node.left);
    const rightHeight = this._getHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Returns the height of the node containing the given value
  height(value) {
    const node = this.find(value);
    if (node === null) {
      return null; // Value not found
    }
    return this._getHeight(node);
  }

  // Returns the depth of the node containing the given value
  // Depth is the number of edges from the root to the given node.
  depth(value, node = this.root, currentDepth = 0) {
    if (node === null) {
      return null; // Value not found
    }
    if (node.data === value) {
      return currentDepth;
    }

    if (value < node.data) {
      return this.depth(value, node.left, currentDepth + 1);
    } else {
      return this.depth(value, node.right, currentDepth + 1);
    }
  }

  // Helper function to check if a subtree is balanced
  // A tree is balanced if, for every node, the height difference between
  // its left and right subtrees is no more than 1.
  _isBalanced(node) {
    if (node === null) {
      return true; // An empty tree is balanced
    }

    const leftHeight = this._getHeight(node.left);
    const rightHeight = this._getHeight(node.right);

    // Check if the current node is balanced AND its left and right subtrees are balanced
    const balanceCondition = Math.abs(leftHeight - rightHeight) <= 1;
    return (
      balanceCondition &&
      this._isBalanced(node.left) &&
      this._isBalanced(node.right)
    );
  }

  // Checks if the entire tree is balanced
  isBalanced() {
    return this._isBalanced(this.root);
  }

  // Rebalances an unbalanced tree
  rebalance() {
    const nodes = [];
    // Perform an in-order traversal to get all elements in sorted order
    this.inOrder((node) => nodes.push(node.data), this.root);
    // Rebuild the tree from the sorted array
    this.root = this.buildTree(nodes);
  }
}

// Provided prettyPrint function for visualization
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// --- Driver Script ---

// Function to generate an array of random numbers
const generateRandomArray = (size, max = 100) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
};

console.log("--- Initial Tree Creation & Checks ---");

// 1. Create a binary search tree from an array of random numbers < 100.
const randomNumbers = generateRandomArray(15, 100);
console.log("Original random array:", randomNumbers);
const tree = new Tree(randomNumbers);
console.log("\nPretty Print Initial Tree:");
prettyPrint(tree.root);

// 2. Confirm that the tree is balanced by calling isBalanced.
console.log("\nIs the initial tree balanced?", tree.isBalanced()); // Should be true

// 3. Print out all elements in level, pre, post, and in order.
console.log("\n--- Traversal Orders (Initial Tree) ---");

process.stdout.write("Level Order: ");
tree.levelOrder((node) => process.stdout.write(`${node.data} `));
console.log();

process.stdout.write("Pre Order: ");
tree.preOrder((node) => process.stdout.write(`${node.data} `));
console.log();

process.stdout.write("In Order: ");
tree.inOrder((node) => process.stdout.write(`${node.data} `));
console.log();

process.stdout.write("Post Order: ");
tree.postOrder((node) => process.stdout.write(`${node.data} `));
console.log();

console.log("\n--- Unbalancing the Tree ---");

// 4. Unbalance the tree by adding several numbers > 100.
console.log("Adding numbers > 100 to unbalance the tree...");
tree.insert(101);
tree.insert(105);
tree.insert(102);
tree.insert(110);
tree.insert(115);
tree.insert(103); // Further unbalance it

console.log("\nPretty Print Unbalanced Tree:");
prettyPrint(tree.root);

// 5. Confirm that the tree is unbalanced by calling isBalanced.
console.log("\nIs the tree balanced after insertions?", tree.isBalanced()); // Should be false

console.log("\n--- Rebalancing the Tree ---");

// 6. Balance the tree by calling rebalance.
console.log("Rebalancing the tree...");
tree.rebalance();

console.log("\nPretty Print Rebalanced Tree:");
prettyPrint(tree.root);

// 7. Confirm that the tree is balanced by calling isBalanced.
console.log("\nIs the tree balanced after rebalance?", tree.isBalanced()); // Should be true

// 8. Print out all elements in level, pre, post, and in order.
console.log("\n--- Traversal Orders (Rebalanced Tree) ---");

process.stdout.write("Level Order: ");
tree.levelOrder((node) => process.stdout.write(`${node.data} `));
console.log();

process.stdout.write("Pre Order: ");
tree.preOrder((node) => process.stdout.write(`${node.data} `));
console.log();

process.stdout.write("In Order: ");
tree.inOrder((node) => process.stdout.write(`${node.data} `));
console.log();

process.stdout.write("Post Order: ");
tree.postOrder((node) => process.stdout.write(`${node.data} `));
console.log();

console.log("\n--- Additional Tests ---");

// Test find
const valueToFind = randomNumbers[Math.floor(randomNumbers.length / 2)];
console.log(`\nFinding value ${valueToFind}:`, tree.find(valueToFind)?.data);
console.log("Finding non-existent value 999:", tree.find(999));

// Test delete
const valueToDelete = tree.root.data; // Delete the root
console.log(`\nDeleting root value ${valueToDelete}...`);
tree.deleteItem(valueToDelete);
console.log("Pretty Print after deleting root:");
prettyPrint(tree.root);
console.log("Is the tree still balanced?", tree.isBalanced());

// Test height and depth
const someNodeData = tree.root.right?.data; // Pick a node from the right subtree
if (someNodeData) {
  console.log(
    `\nHeight of node with value ${someNodeData}:`,
    tree.height(someNodeData)
  );
  console.log(
    `Depth of node with value ${someNodeData}:`,
    tree.depth(someNodeData)
  );
} else {
  console.log(
    "\nCould not test height/depth on a specific node as tree is too small or right child is null."
  );
}
console.log("Height of the entire tree (root):", tree.height(tree.root.data));
console.log("Depth of a non-existent value 500:", tree.depth(500));
