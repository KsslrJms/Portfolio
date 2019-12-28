/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.csc454hw3;

import java.util.ArrayList;



/**
 *
 * @author ksslr
 */
public class XORModel extends Model{
    int id;
    
    boolean o;
    public XORModel(int i){
        inputs = new ArrayList();
        out = new Pipe();
        id = i;
    }
    @Override
    public void lambda(){
        out.delta(o);
    }
    
    @Override
    public void delta(){
        o = inputs.get(0).state != inputs.get(1).state;
    }
    @Override
    public void setOut(Pipe o){
        out = o;
    }
    @Override
    public void setIn(Pipe i){
        inputs.add(i);
    }
    @Override
    public void print(){
        System.out.println("XOR " + id + " Lambda:" + out.state);
        System.out.println("XOR " + id + " Delta: " + inputs.get(0).state + " " + inputs.get(1).state);
        
    }
}
