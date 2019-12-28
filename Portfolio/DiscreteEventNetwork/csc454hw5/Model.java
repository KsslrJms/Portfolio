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
abstract class Model {
    ArrayList<Pipe> inputs;
    Pipe out;
    double ta;
    double alarm;
    boolean lambda;
    void deltaext(double time){
        
    }
    void deltaint(double time){
        
    }
    void deltacon(double time){
        
    }
    void lambda(){
        
    }
    double ta(){
        return alarm;
    }
    void setIn(Pipe p){
        
    }
    void setOut(Pipe p){
        
    }
}
