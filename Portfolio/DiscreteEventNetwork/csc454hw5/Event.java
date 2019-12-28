/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.csc454hw5;

/**
 *
 * @author ksslr
 */
public class Event {
    double time;
    Model m;
    int input; //1 = deltaext, 2 = deltaint, 3 = deltacon
    public Event(Model x, double t, int i){
        m = x;
        time = t;
        input = i;
    }
    void execute(){
        if(input == 1){
            m.deltaext(time);
        }
        else if(input == 2){
            m.deltaint(time);
        }
        else if(input == 3){
            m.deltacon(time);
        }
    }
    @Override
    public String toString(){
        return "Event at time: " + time;
    }
}
