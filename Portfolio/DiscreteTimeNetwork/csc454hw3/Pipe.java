/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.csc454hw3;

/**
 *
 * @author ksslr
 */
public class Pipe {
    int id;
    boolean state;
    public Pipe(){
        state = false;
    }
    void delta(boolean x){
        state = x;
    }
    boolean lambda(){
        return state;
    }
}
