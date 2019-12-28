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
public class Machine extends Model{
    int parts;
    String name;
    public Machine(double t, String n){
        inputs = new ArrayList();
        parts = 0;
        ta = t;
        alarm = 0.0;
        lambda = false;
        name = n;
    }
    @Override
    void lambda(){
        if(lambda){
            out.delta(1);
            System.out.println(name + ": Part ejected");
        }
        else{
            out.delta(0);
            System.out.println(name + ": Part not ejected");
        }
        System.out.println("Parts in bin: " + parts);
        
    }
    @Override
    void deltaext(double time){
        lambda = false;
        alarm = ta();
        for(Pipe<Integer> p : inputs){
            parts += p.lambda();
        }
        System.out.println(name + ": deltaExt, parts: " + parts);
    }
    @Override
    void deltacon(double time){
        if(parts != 0){
            lambda = true;
            parts--;
        }
        alarm = time + ta;
        for(Pipe<Integer> p : inputs){
            parts += p.lambda();
        }
        System.out.println(name + ": deltaCon, parts: " + parts);
    }
    @Override
    void deltaint(double time){
        if(parts != 0){
            lambda = true;
            parts--;
        }
        alarm = time + ta;
        System.out.println(name + ": deltaInt, parts: " + parts);
    }
    @Override
    double ta(){
        if(parts == 0){
            return Double.POSITIVE_INFINITY;
        }
        else{
            return alarm;
        }
    }
    @Override
    void setIn(Pipe p){
        inputs.add(p);
    }
    @Override
    void setOut(Pipe p){
        out = p;
    }
}
