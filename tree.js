//  importing
import { Node } from "./node.js";
import { removeDuplicates, mergeSort } from "./util.js";

export class BST {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  buildTree(arr) {
    const sortedArray = mergeSort(removeDuplicates(arr));
    const mid = Math.floor(arr.length / 2);

    // if it's the first element
    if(!this.root) 
  }

  prettyPrint(node, prefix = "", isLeft = true) {
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
  }
}
