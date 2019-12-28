/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.csc454hw5;

import java.util.Scanner;

/**
 *
 * @author ksslr
 */
public class Main {
    public static void main(String[] args){
        Scanner kb = new Scanner(System.in);
        Machine press = new Machine(1.0, "Press");
        Machine drill = new Machine(2.0, "Drill");
        Network n = new Network();
        n.link(press, drill);
        n.linkIn(press);
        n.linkOut(drill);
        n.AddModel(press);
        n.AddModel(drill);
        boolean quit = false;
        System.out.println("Simulation started, type Q to quit.");
        while(!quit){
            System.out.println("How many parts are you putting in?");
            String input = kb.nextLine();
            if(input.equals("Q")){
                System.out.println("Quitting...");
                quit = true;
            }
            else{
                int bin = Integer.parseInt(input);
                System.out.println("Please enter trajectory:");
                input = kb.nextLine();
                if(input.equals("Q")){
                    System.out.println("Quitting...");
                    quit = true;
                }
                else{
                    double trajectory = Double.parseDouble(input);
                    n.lambda();
                    n.delta(trajectory, bin);
                }
            }
        }
    }
}
