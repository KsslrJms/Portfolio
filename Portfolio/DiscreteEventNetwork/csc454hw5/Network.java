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
public class Network {
    Pipe<Integer> in;
    Pipe<Integer> out;
    MinHeap schedule;
    ArrayList<Model> models;
    double clock;
    public Network(){
        in = new Pipe(0);
        out = new Pipe(0);
        schedule = new MinHeap();
        models = new ArrayList();
        clock = 0.0;
    }
    void lambda(){
        if(out.lambda() == 0){
            System.out.println("No Part completed.");
        }
        else{
            System.out.println("Part completed.");
        }
    }
    void delta(double trajectory, int x){
        in.delta(x);
        for(Model m: models){
            //m.lambda();
            Event nEvent = new Event(m, clock, 1);
            schedule.insert(nEvent);
        }
        clock += trajectory;
        boolean catchup = false;
        while(!catchup){
            Event pop = schedule.remove();
            if(pop.time <= clock){
                System.out.print(pop.time + ": ");
                pop.m.lambda();
                pop.execute();
                if(pop.input == 2 || pop.input == 3){
                    Event update = new Event(pop.m, pop.m.ta(),2);
                    schedule.insert(update);
                }
            }
            else{
                catchup = true;
                schedule.insert(pop);
            }
        }
        System.out.println("Current time: " + clock);
        
    }
    void AddModel(Machine m){
        models.add(m);
        Event start = new Event(m, m.ta, 2);
        schedule.insert(start);
        schedule.print();
    }
    void link(Machine a, Machine b){
        Pipe<Integer> link = new Pipe(0);
        a.setOut(link);
        b.setIn(link);
    }
    void linkIn(Machine a){
        a.setIn(in);
    }
    void linkOut(Machine b){
        b.setOut(out);
    }
}
