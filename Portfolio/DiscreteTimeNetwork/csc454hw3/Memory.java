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
public class Memory extends Model{
    
    boolean save;
    public Memory(){
        inputs = new ArrayList();
        save = false;
        out = new Pipe();
    }
    
    @Override
    public void delta(){
        save = inputs.get(0).state;
    }
    @Override
    public void lambda(){
        out.delta(save);
    }
    @Override
    public void print(){
        System.out.println("Memory Lambda: " + out.state);
        System.out.println("Memory Delta: " + inputs.get(0).state);
        
    }
    @Override
    public void setIn(Pipe i){
        inputs.add(i);
    }
    @Override
    public void setOut(Pipe o){
        out = o;
    }
}
