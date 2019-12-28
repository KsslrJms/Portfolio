/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.csc454hw3;

import java.util.Scanner;

/**
 *
 * @author ksslr
 */
public class Main {
    public static void main(String[] args){
        Network n = new Network(3);
        XORModel xr1 = new XORModel(1);
        XORModel xr2 = new XORModel(2);
        Memory m = new Memory();
        n.linkPipe(n.in1, xr1);
        n.linkPipe(n.in2, xr1);
        n.link(xr1, xr2);
        n.link(xr2, m);
        n.link(m, xr2);
        n.setOut(xr2.out);
        n.add(xr1);
        n.add(xr2);
        n.add(m);
        Scanner kb = new Scanner(System.in);
        boolean x1 = false,x2 = false,exit = false,step;
        while(!exit){
            step = false;
            boolean format = false;
            while(!format){
                System.out.println("Enter Boolean 1 (T for true, F for false), or X to exit:");
                String input = kb.nextLine();
                if(input.equals("T")){
                    x1 = true;
                    format = true;
                }
                else if(input.equals("F")){
                    x1 = false;
                    format = true;
                }
                else if(input.equals("X")){
                    System.out.println("Exiting...");
                    exit = true;
                    format = true;
                }
                else{
                    System.out.println("INVALID, PLEASE TRY AGAIN.");
                }
            }
            format = false;
            while(!format && !exit){
                System.out.println("Enter Boolean 2 (T for true, F for false), or X to exit:");
                String input = kb.nextLine();
                if(input.equals("T")){
                    x2 = true;
                    format = true;
                }
                else if(input.equals("F")){
                    x2 = false;
                    format = true;
                }
                else if(input.equals("X")){
                    System.out.println("Exiting...");
                    exit = true;
                    format = true;
                }
                else{
                    System.out.println("INVALID, PLEASE TRY AGAIN.");
                }
                
            }
            while(!step && !exit){
                System.out.println("Step?");
                String input = kb.nextLine();
                if(input.equals("Y")){
                    n.stepToggle(true);
                    step = true;
                }
                else if(input.equals("N")){
                    n.stepToggle(false);
                    step = true;
                }
                else{
                    System.out.println("Invalid.");
                }    
            }
            if(!exit){
                n.lambda();
                n.delta(x1, x2);
            }
        }
    }
}
