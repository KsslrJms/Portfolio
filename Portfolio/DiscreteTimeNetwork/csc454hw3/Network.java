/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.csc454hw3;

import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author ksslr
 */
public class Network {

    Scanner kb;

    Pipe in1, in2, out;
    ArrayList<Model> models = new ArrayList<Model>();
    boolean step;
    int ticks;

    public Network(int t) {
        ticks = t;
        step = false;
        in1 = new Pipe();
        in2 = new Pipe();
        out = new Pipe();
        kb = new Scanner(System.in);
    }

    void add(Model m) {
        models.add(m);
    }

    void link(Model a, Model b) {
        Pipe p = new Pipe();
        a.setOut(p);
        b.setIn(p);
    }
    void linkPipe(Pipe i, Model a){
        a.setIn(i);
    }
    void delta(boolean x1, boolean x2) {
        in1.delta(x1);
        in2.delta(x2);
        int count = 1;
        while (count <= ticks) {
            if (step) {
                System.out.println("Tick " + count + ":");
                System.out.println("Network Lambda: " + out.lambda());
                System.out.println("Network Delta: " + in1.state + " " + in2.state);
                
                for (Model m : models) {
                    m.lambda();
                }
                for (Model m:models){
                    m.delta();
                }
                for(Model m:models){
                    m.print();
                }
                System.out.println("Inject? Y/N");
                String input = kb.nextLine();
                if (input.equals("Y")) {
                    boolean change = false;
                    while (!change) {
                        System.out.println("Input 1:");
                        input = kb.nextLine();
                        if (input.equals("T")) {
                            in1.delta(true);
                            change = true;
                        } else if (input.equals("F")) {
                            in1.delta(false);
                            change = true;
                        } else {
                            System.out.println("Invalid boolean, please try again");
                        }
                    }
                    change = false;
                    while (!change) {
                        System.out.println("Input 2");
                        input = kb.nextLine();
                        if (input.equals("T")) {
                            in2.delta(true);
                            change = true;
                        } else if (input.equals("F")) {
                            in2.delta(false);
                            change = true;
                        } else {
                            System.out.println("Invalid boolean, please trey again");
                        }
                    }
                } else {

                }
                count++;
            }
            else{
                for(Model m: models){
                    m.lambda();
                    m.delta();
                }
                count++;
            }
        }
    }

    void lambda() {
        System.out.println(out.lambda());
    }

    void stepToggle(boolean x) {
        step = x;
    }

    void setIn(Pipe i, int x) {
        if (x == 1) {
            in1 = i;
        } else if (x == 2) {
            in2 = i;
        }
    }

    void setOut(Pipe i) {
        out = i;
    }
}
