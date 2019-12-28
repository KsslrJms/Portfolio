/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.csc454hw5;

import java.util.ArrayList;

/**
 *
 * @author ksslr
 */
public class MinHeap{ 
    private ArrayList<Event> Heap; 
  
     
  
    public MinHeap(){ 
        Heap = new ArrayList<>();
    } 
  
    // Function to return the position of 
    // the parent for the node currently 
    // at pos 
    private int parent(int pos){ 
        return pos / 2; 
    } 
  
    // Function to return the position of the 
    // left child for the node currently at pos 
    private int leftChild(int pos){ 
        return (2 * pos); 
    } 
  
    // Function to return the position of 
    // the right child for the node currently 
    // at pos 
    private int rightChild(int pos){ 
        return (2 * pos) + 1; 
    } 
  
    // Function that returns true if the passed 
    // node is a leaf node 
    private boolean isLeaf(int pos) 
    { 
        if (pos >= (Heap.size() / 2) && pos <= Heap.size()) { 
            return true; 
        } 
        return false; 
    } 
  
    // Function to swap two nodes of the heap 
    private void swap(int fpos, int spos) 
    { 
        Event tmp; 
        tmp = Heap.get(fpos);
        Heap.set(fpos, Heap.get(spos));
        Heap.set(spos, tmp);
    } 
  
    // Function to heapify the node at pos 
    private void minHeapify(int pos) 
    { 
  
        // If the node is a non-leaf node and greater 
        // than any of its child 
        if (!isLeaf(pos)) { 
            if (Heap.get(pos).time > Heap.get(leftChild(pos)).time || Heap.get(pos).time > Heap.get(rightChild(pos)).time) { 
  
                // Swap with the left child and heapify 
                // the left child 
                if (Heap.get(leftChild(pos)).time < Heap.get(rightChild(pos)).time) { 
                    swap(pos, leftChild(pos)); 
                    minHeapify(leftChild(pos)); 
                } 
  
                // Swap with the right child and heapify 
                // the right child 
                else { 
                    swap(pos, rightChild(pos)); 
                    minHeapify(rightChild(pos)); 
                } 
            } 
        } 
    } 
  
    // Function to insert a node into the heap 
    public void insert(Event element) 
    {   
        boolean alter = false;
        for(Event e : Heap){
            if(e.time == element.time){
                if(e.m == element.m){
                    if(e.input == 2 && element.input == 1){
                        e.input = 3;
                        alter = true;
                    }
                }
            }
        }
        if(!alter){
            Heap.add(element);
            int current = Heap.indexOf(element); 
            while (Heap.get(current).time < Heap.get(parent(current)).time) { 
                swap(current, parent(current)); 
                current = parent(current); 
            }
        }
        
        
    } 
  
    
  
    // Function to build the min heap using 
    // the minHeapify 
    public void minHeap() 
    { 
        for (int pos = (Heap.size() / 2); pos >= 1; pos--) { 
            minHeapify(pos); 
        } 
    }
    public void print() 
    { 
        for (int i = 0; i < Heap.size(); i++) {
            System.out.println("Current: " + Heap.get(i));
            if(i == 0){
                System.out.println("CURRENT IS ROOT!");
            }
            else{
                System.out.println("Parent:" + Heap.get((i-1)/2));
            }
            if(2*i+1 >= Heap.size()){
                System.out.println("NO LEFT CHILD");
            }
            else{
                System.out.println("Left: " + Heap.get(2*i+1));
            }
            if(2*i+2 >= Heap.size()){
                System.out.println("NO RIGHT CHILD");
            }
            else{
                System.out.println("Right: " + Heap.get(2*i+2));
            }
            //System.out.println(Heap.get(i));
        }
        System.out.println();
    }
  
    // Function to remove and return the minimum 
    // element from the heap 
    public Event remove() 
    { 
        Event popped = Heap.get(0); 
        Heap.remove(0); 
        minHeapify(0); 
        return popped; 
    }
}
